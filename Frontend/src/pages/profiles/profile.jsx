import React, { useState } from "react";
import edit from "../../assets/edit.svg";
import pic from "../../assets/pic.jpg";
import Modal from "../../components/modals";

function Profile() {


  const [avatarInfo, setAvatarInfo] = useState({
    name: "Soham",
    specailization: "Ceo of Interv",
    email: "sohampanchal1469@gmail.com",
  });

  const [modalData, setModalData] = useState([]);
  const [pict, setPict] = useState(pic);
  const [initialData, setInitialData] = useState({
    firstname: "Soham",
    lastname: "",
    phoneno: "+91 9511671955",
    Education: [
      {
        College: "MU",
        Degree: "BE COMPUTER SCIENCE",
        Year: "2021-2025",
      },
      {
        College: "MIT",
        Degree: "MBA/MSC COMPUTER SCIENCE",
        Year: "2026-2028",
      },
    ],
    Projects: [
      {
        projectName: "Chatbot",
        projectLink: "link",
      },
    ],
    intrest: "Football" //Testing purpose
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (key, i) => {
    setIsModalOpen(true);
    if (key === "Profile") {
      setModalData([
        {
          type: "text",
          name: "firstname",
          label: "firstname",
          value: `${initialData?.firstname ? initialData.firstname : " "}`,
        },
        {
          type: "text",
          name: "lastname",
          label: "lastname",
          value: `${initialData?.lastname ? initialData.lastname : " "}`,
        },
        {
          type: "text",
          name: "phoneno",
          label: "phoneno",
          value: `${initialData?.phoneno ? initialData.phoneno : " "}`,
        },
      ]);
    } else if (key === "Education") {
      setModalData([
        {
          type: "text",
          name: "College",
          label: "College",
          value: `${initialData?.Education[i]?.College
            ? initialData?.Education[i]?.College
            : " "}`,
        },
        {
          type: "text",
          name: "Year",
          label: "Year",
          value: `${initialData?.Education[i]?.Year
            ? initialData.Education[i].Year
            : " "}`,
        },
        {
          type: "text",
          name: "Degree",
          label: "Degree",
          value: `${initialData?.Education[i]?.Degree
            ? initialData.Education[i].Degree
            : " "}`,
        },
      ]);
    } else if (key === "Project") {
      setModalData([
        {
          type: "text",
          name: "Project Name",
          label: "Project Name",
          value: `${initialData?.Projects[i]?.projectName
            ? initialData?.Projects[i]?.projectName
            : " "}`,
        },
        {
          type: "text",
          name: "Project Link",
          label: "Project Link",
          value: `${initialData?.Projects[i]?.projectLink
            ? initialData?.Projects[i]?.projectLink
            : " "}`,
        },
      ]);
    }
  };

  const saveChanges = () => {
    setInitialData({
      ...initialData,
      firstname: modalData[0]?.value || initialData.firstname,
      lastname: modalData[1]?.value || initialData.lastname,
      phoneno: modalData[2]?.value || initialData.phoneno,
    });
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 gap-2 px-2 sm:grid-cols-6 md:grid-cols-12">
      <div
        className={`fixed inset-0 flex items-center col-span-1 sm:col-span-6 md:col-span-12 justify-center z-50 ${isModalOpen ? "visible" : "hidden"
          }`}
      >
        <div className="flex items-center content-center justify-center w-full h-full p-4">
          <Modal
            modalData={modalData}
            setModalData={setModalData}
            setIsModalOpen={setIsModalOpen}
            setPict={setPict}
            saveChanges={saveChanges}
            setInitialData={setInitialData} // Pass setInitialData as a prop
            initialData={initialData} // Pass initialData as a prop
          />

        </div>
      </div>
      <div className="col-span-1 sm:col-span-6 md:col-span-12 ">
        <div className="static col-span-1 rounded-md h-52 sm:col-span-6 md:col-span-12 bg-blue-primary"></div>
        <div className="grid grid-cols-1 gap-2 px-2 sm:grid-cols-6 md:grid-cols-12">
          <div className="relative col-span-1 sm:col-span-6 md:col-span-8">
            <img src={pict} alt="picture" className="absolute top-0 w-32 h-32 col-span-1 overflow-hidden transform translate-x-1 -translate-y-1/2 bg-white border-4 border-white rounded-full lg:col-span-12 sm:col-span-6 sm:w-36 sm:h-36 left-5" />
            <div className="z-10 p-2 pl-5 mt-4 mb-2 border-2 rounded-md sm:pl-8 h-52 sm:col-span-6 md:col-span-8 border-blue-primary">
              <div>
                <div
                  className="flex flex-row hover:cursor-pointer"
                  onClick={() => {
                    openModal("Profile");
                  }}
                >
                  <img src={edit} alt="edit" className="ml-auto mr-2" />
                  <span className="text-lg">Edit</span>
                </div>
                <div className="mt-2 text-xl font-semibold sm:mt-6 sm:text-2xl">
                  {initialData.firstname} {initialData.lastname}
                </div>
                <div className="">Full Stack Developer</div>
                <div className="">{initialData.phoneno}</div>
                <div className="">Mumbai, Maharashtra, India</div>
              </div>
            </div>
            <div className="p-2 pl-5 mb-2 border-2 rounded-md sm:pl-8 h-52 sm:col-span-6 md:col-span-8 border-blue-primary">
              <div className="flex flex-row">
                <span className="text-2xl font-bold">Experience </span>
                <img src={edit} alt="edit" className="ml-auto mr-2" />
                <span className="text-lg">Add</span>
                <img src={edit} alt="edit" className="ml-2 mr-2" />
                <span className="text-lg">Edit</span>
              </div>
              <div className="w-full h-full"></div>
            </div>
            <div className="p-2 pl-5 mb-2 border-2 rounded-md sm:pl-8 h-52 sm:col-span-6 md:col-span-8 border-blue-primary">
              <div className="flex flex-row">
                <span className="text-2xl font-bold">Interest </span>
                <img src={edit} alt="edit" className="ml-auto mr-2" />
                <span className="text-lg">Add</span>
                <img src={edit} alt="edit" className="ml-2 mr-2" />
                <span className="text-lg">Edit</span>
              </div>
              <div className="w-full h-full"></div>
            </div>
            <div className="p-2 pl-5 mb-2 border-2 rounded-md sm:pl-8 min-h-52 max-h-fit sm:col-span-6 md:col-span-8 border-blue-primary">
              <div className="flex flex-row">
                <span className="text-2xl font-bold">Education </span>
                <img src={edit} alt="add" className="ml-auto mr-2" />
                <span className="text-lg">Add</span>
              </div>
              <div className="w-full h-full">
                {initialData?.Education?.map((data, key) => (
                  <div key={key} className="w-full p-2 mb-2 border-2 rounded-lg max-content min-h-20 border-blue-primary">
                    <div className="flex text-lg ont-semibold">
                      {data.College}
                      <div
                        className="ml-auto hover:cursor-pointer"
                        onClick={() => {
                          openModal("Education", key);
                        }}
                      >
                        <div className="flex">
                          <img src={edit} alt="edit" className="ml-2 mr-2" />
                          <span className="text-lg">Edit</span>
                        </div>
                      </div>
                    </div>
                    <span>{data.Degree}</span>
                    <span>{data.Year}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-2 pl-5 mb-2 border-2 rounded-md sm:pl-8 h-52 sm:col-span-6 md:col-span-8 border-blue-primary">
              <div className="flex flex-row">
                <span className="text-2xl font-bold">Projects </span>
                <img src={edit} alt="edit" className="ml-auto mr-2" />
                <span className="text-lg">Add</span>
                <img src={edit} alt="edit" className="ml-2 mr-2" />
                <span className="text-lg">Edit</span>
              </div>
              <div className="w-full h-full"></div>
            </div>
          </div>
          <div className="hidden col-span-4 gap-2 mt-4 md:block">
            <div className="hidden w-full h-40 p-2 mb-2 border-2 rounded-md md:block border-blue-primary">
              <span className="text-2xl font-bold">Badges</span>
            </div>
            <div className="hidden w-full h-40 p-2 mb-2 border-2 rounded-md md:block border-blue-primary">
              <span className="text-2xl font-bold">Anaylitcs</span>
            </div>
            <div className="hidden w-full h-auto p-2 mb-2 border-2 rounded-md md:block border-blue-primary">
              <span className="text-2xl font-bold">Connections</span>
              {/* <ProfileAvatar AvatarInfo={avatarInfo} />
              <ProfileAvatar AvatarInfo={avatarInfo} />
              <ProfileAvatar AvatarInfo={avatarInfo} />
              <ProfileAvatar AvatarInfo={avatarInfo} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
