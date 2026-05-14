import EventForm from "./EventForm";

export default function EventModal({
  isOpen,
  onClose,
  onSubmit,
  eventData,
  onChange,
  isEditMode,
  clubSelectOptions = [],
  allowEventWithoutClub = false,
  clubLocked = false,
  clubIdForJudgeSearch = null,
  apiCall = null,
  judgeUsers = [],
  onJudgeUsersChange,
  mapPreview = null,
  mapError = "",
  mapLoading = false,
  onPreviewMap,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-on-surface">Editar prueba / evento</h2>
        <EventForm
          eventData={eventData}
          onChange={onChange}
          onSubmit={onSubmit}
          onCancel={onClose}
          isEditMode={isEditMode}
          clubSelectOptions={clubSelectOptions}
          allowEventWithoutClub={allowEventWithoutClub}
          clubLocked={clubLocked}
          clubIdForJudgeSearch={clubIdForJudgeSearch}
          apiCall={apiCall}
          judgeUsers={judgeUsers}
          onJudgeUsersChange={onJudgeUsersChange}
          mapPreview={mapPreview}
          mapError={mapError}
          mapLoading={mapLoading}
          onPreviewMap={onPreviewMap}
        />
      </div>
    </div>
  );
}
