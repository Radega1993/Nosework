#!/usr/bin/env node

/**
 * Schema.org Verification Script
 * Validates Schema.org JSON-LD markup in pages
 * 
 * Usage: node scripts/verify-schema.js [url]
 * Example: node scripts/verify-schema.js http://localhost:3000/events
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function extractSchemaMarkup(html) {
  const schemaRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gs;
  const schemas = [];
  let match;
  
  while ((match = schemaRegex.exec(html)) !== null) {
    try {
      const schema = JSON.parse(match[1]);
      schemas.push(schema);
    } catch (e) {
      console.error('Error parsing schema:', e.message);
    }
  }
  
  return schemas;
}

function validateSchema(schema) {
  const errors = [];
  const warnings = [];
  
  // Check required fields for SportsEvent
  if (schema['@type'] === 'SportsEvent') {
    if (!schema.name) {
      errors.push('Missing required field: name');
    }
    if (!schema.startDate) {
      errors.push('Missing required field: startDate');
    }
  }
  
  // Check required fields for ItemList
  if (schema['@type'] === 'ItemList') {
    if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
      errors.push('Missing or invalid field: itemListElement');
    }
  }
  
  // Check @context
  if (!schema['@context']) {
    warnings.push('Missing @context (should be "https://schema.org")');
  } else if (schema['@context'] !== 'https://schema.org') {
    warnings.push(`Unexpected @context: ${schema['@context']}`);
  }
  
  return { errors, warnings };
}

async function main() {
  const url = process.argv[2] || 'http://localhost:3000/events';
  
  console.log(`Fetching: ${url}`);
  console.log('---\n');
  
  try {
    const html = await fetchPage(url);
    const schemas = extractSchemaMarkup(html);
    
    if (schemas.length === 0) {
      console.log('❌ No Schema.org markup found');
      process.exit(1);
    }
    
    console.log(`✅ Found ${schemas.length} schema(s)\n`);
    
    let hasErrors = false;
    
    schemas.forEach((schema, index) => {
      console.log(`Schema ${index + 1}:`);
      console.log(`  Type: ${schema['@type']}`);
      
      const { errors, warnings } = validateSchema(schema);
      
      if (errors.length > 0) {
        hasErrors = true;
        console.log(`  ❌ Errors:`);
        errors.forEach(err => console.log(`    - ${err}`));
      }
      
      if (warnings.length > 0) {
        console.log(`  ⚠️  Warnings:`);
        warnings.forEach(warn => console.log(`    - ${warn}`));
      }
      
      if (errors.length === 0 && warnings.length === 0) {
        console.log(`  ✅ Valid`);
      }
      
      console.log('');
    });
    
    if (hasErrors) {
      console.log('❌ Validation failed');
      process.exit(1);
    } else {
      console.log('✅ All schemas are valid');
      console.log('\nNote: For complete validation, use Google Rich Results Test:');
      console.log('https://search.google.com/test/rich-results');
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
