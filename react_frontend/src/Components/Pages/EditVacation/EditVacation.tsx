import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Holiday from "../../models/vacation";


function EditVacation(): JSX.Element {
  const { holidayCode } = useParams<{ holidayCode: string }>();
  const navigate = useNavigate();

  const [vacation, setVacation] = useState<Holiday | null>(null);
  const [editedVacation, setEditedVacation] = useState<Holiday | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchVacation = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/holidays/getById/${holidayCode}`);
        const vacationData = response.data[0];
        const fetchedVacation: Holiday = new Holiday(
          vacationData.holidayCode,
          vacationData.holidayDestination,
          vacationData.holidayDescription,
          new Date(vacationData.holidayStartDate),
          new Date(vacationData.holidayEndDate),
          vacationData.price,
          vacationData.holidayImage,
          vacationData.followers
        );

        setVacation(fetchedVacation);
        setEditedVacation(fetchedVacation);
      } catch (error) {
        console.error("Error fetching vacation:", error);
        // Handle error state
      }
    };

    fetchVacation();
  }, [holidayCode]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedVacation((prevVacation) => ({
      ...(prevVacation as Holiday),
      [name]: value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSave = async () => {
    try {
      // Convert holidayStartDate and holidayEndDate to the desired format
      const formattedStartDate = editedVacation?.holidayStartDate?.toISOString().slice(0, 19).replace('T', ' ');
      const formattedEndDate = editedVacation?.holidayEndDate?.toISOString().slice(0, 19).replace('T', ' ');

      // Create a new FormData and append the updated fields
      const formData = new FormData();
      formData.append("holidayCode", holidayCode || "");
      formData.append("holidayDestination", editedVacation?.holidayDestination || "");
      formData.append("holidayDescription", editedVacation?.holidayDescription || "");
      formData.append("holidayStartDate", formattedStartDate || "");
      formData.append("holidayEndDate", formattedEndDate || "");
      formData.append("price", String(editedVacation?.price || ""));
      formData.append("holidayImage", imageFile || vacation?.holidayImage || "");

      // Perform save operation with the formData using axios.put
      await axios.put("http://localhost:4000/api/holidays/update", formData);
      

      // Redirect back to the vacations page
      navigate("/vacations");
    } catch (error) {
      console.error("Error updating vacation:", error);
      // Handle error state
    }
  };

  const handleCancel = () => {
    navigate("/MainLayout");
  };

  if (!vacation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="EditVacation">
      <h2>Edit Vacation</h2>
      <div>
        Holiday Code:
        <p>{holidayCode}</p>
      </div>
      <div>
        <label htmlFor="holidayDestination">Destination:</label>
        <input
          type="text"
          id="holidayDestination"
          name="holidayDestination"
          value={editedVacation?.holidayDestination || ""}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="holidayDescription">Description:</label>
        <input
          type="textarea"
          id="holidayDescription"
          name="holidayDescription"
          value={editedVacation?.holidayDescription || ""}
          onChange={handleInputChange}
          
        />
      </div>
      <div>
        <label htmlFor="holidayStartDate">Start Date:</label>
        <input
          type="date"
          id="holidayStartDate"
          name="holidayStartDate"
          value={editedVacation?.holidayStartDate?.toISOString().split("T")[0] || ""}
          onChange={handleInputChange}
        
        />
      </div>
      <div>
        <label htmlFor="holidayEndDate">End Date:</label>
        <input
          type="date"
          id="holidayEndDate"
          name="holidayEndDate"
          value={editedVacation?.holidayEndDate?.toISOString().split("T")[0] || ""}
          onChange={handleInputChange}
          
        />
      </div>
      <div>
        <label>Image:</label>
        <img src={vacation.holidayImage} alt={vacation.holidayDestination} style={{ width: "200px", height: "150px" }} />
      </div>
      <div>
        <label htmlFor="image">Select a new image:</label>
        <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={editedVacation?.price || ""}
          onChange={handleInputChange}
          
        />
      </div>

      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>

    </div>
  );
}

export default EditVacation;
