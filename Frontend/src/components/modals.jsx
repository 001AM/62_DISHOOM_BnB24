import React from "react";

export default function Modal({
  modalData,
  setModalData,
  setIsModalOpen,
  setPict,
  saveChanges,
  setInitialData, // Add setInitialData as a prop
  initialData, // Add initialData as a prop
}) {
  const handleChange = (e, index) => {
    const { value } = e.target;
    const updatedModalData = [...modalData];
    updatedModalData[index] = {
      ...updatedModalData[index],
      value: value
    };
    setModalData(updatedModalData);

    // Update initialData based on the key
    if (modalData[index].name === "firstname") {
      setInitialData({
        ...initialData,
        firstname: value
      });
    } else if (modalData[index].name === "lastname") {
      setInitialData({
        ...initialData,
        lastname: value
      });
    } else if (modalData[index].name === "phoneno") {
      setInitialData({
        ...initialData,
        phoneno: value
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full p-4 bg-white rounded shadow-lg sm:w-4/5 md:w-2/5 lg:2/5 min-h-3/5 max-72">
      <span onClick={closeModal} className="absolute top-0 right-0 p-4 cursor-pointer">
        &times;
      </span>
      <div className="p-4">
        {modalData.map((data, index) => (
          <div key={index}>
            <label className="text-lg font-semibold">{data.label}</label>
            <input
              className="rounded-lg"
              type={data.type}
              value={data.value}
              name={data.name}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        ))}
        <div>
          <input type="file" onChange={(event) => setPict(URL.createObjectURL(event.target.files[0]))} />
          <button onClick={saveChanges}>SAVE</button>
        </div>
      </div>
    </div>
  );
}
