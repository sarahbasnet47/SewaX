const DeleteModal = ({ onCancel, onDelete }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-[#E7E2D7] bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F6E5DE]">
            <span className="text-2xl text-[#B45F43]">!</span>
          </div>

          <h2 className="text-xl font-bold text-[#245747]">Confirm Delete</h2>
        </div>

        {/* Message */}
        <p className="leading-6 text-[#6B7280]">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>

        {/* Buttons */}
        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-lg border border-[#E7E2D7] bg-[#F7F5EF] px-5 py-2.5 font-medium text-[#245747] transition hover:bg-[#E5EDE7]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="cursor-pointer rounded-lg bg-[#B45F43] px-5 py-2.5 font-medium text-white transition hover:bg-[#984B34]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
