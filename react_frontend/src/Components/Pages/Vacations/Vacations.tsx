import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import "./Vacations.css";
import Holiday from "../../models/vacation";
import LogoutButton from "../../LogoutButton/LogoutButton";

function Vacations(): JSX.Element {
  const [vacations, setVacations] = useState<Holiday[]>([]);
  const [followingVacations, setFollowingVacations] = useState<string[]>([]);
  const [deletingVacationCode, setDeletingVacationCode] = useState<number | null>(null);
  const [followers, setFollowers] = useState<{ [key: string]: number }>({});
  const [showFollowed, setShowFollowed] = useState<boolean>(false);
  const [showActive, setShowActive] = useState<boolean>(false);
  const [showUpcoming, setShowUpcoming] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

  // Fetch vacations that the current user is following
  const fetchFollowedVacations = async () => {
  try {
    const user_code = localStorage.getItem("user_code");
    const response = await axios.get(`http://localhost:4000/api/followers/getByUserCode/${user_code}`);
    if (response?.status === 200 && Array.isArray(response?.data.vacationFollowers)) {
      const followedVacations = response.data.vacationFollowers.map((item: { vacation_code: any; }) => String(item.vacation_code));
      setFollowingVacations(followedVacations);
    } else {
      console.error("Invalid response data format:", response?.data);
    }
  } catch (error) {
    console.error("Error fetching followed vacations:", error);
  }
};

  useEffect(() => {
    const fetchVacations = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/holidays/getAll");
        if (!response.ok) {
          throw new Error("Failed to fetch vacations");
        }
        const vacationsData = await response.json();
        const fetchedVacations: Holiday[] = vacationsData.map((vacation: any) => {
          return new Holiday(
            vacation.holidayCode,
            vacation.holidayDestination,
            vacation.holidayDescription,
            new Date(vacation.holidayStartDate),
            new Date(vacation.holidayEndDate),
            vacation.price,
            vacation.holidayImage,
            vacation.followers,
          );
        });
        // Sort vacations by start date in ascending order
        fetchedVacations.sort((a, b) => a.holidayStartDate.getTime() - b.holidayStartDate.getTime());

        setVacations(fetchedVacations);

        fetchedVacations.forEach((vacation) => {
          fetchFollowers(vacation.holidayCode);
        });
      } catch (error) {
        console.error("Error fetching vacations:", error);
      }
    };

    const fetchFollowers = async (holidayCode: number) => {
      try {
        const response = await axios.get(`http://localhost:4000/api/followers/getById/${holidayCode}`);
        //console.log("API Response for holidayCode", holidayCode, ":", response.data);
        if (response.status === 200) {
          const followersCount = response.data.vacationFollowers;
          setFollowers((prevFollowers) => ({
            ...prevFollowers,
            [holidayCode]: followersCount,
          }));
        } else {
          throw new Error("Failed to fetch followers");
        }
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };
    fetchVacations();
    fetchFollowedVacations();
  }, []);
  
  const toggleFollow = async (holidayCode: string) => {
    try {
      if (followingVacations.includes(holidayCode)) {
        // Unfollow the vacation
        setFollowingVacations((prevFollowingVacations) =>
          prevFollowingVacations.filter((code) => code !== holidayCode)
        );
        setFollowers((prevFollowers) => ({
          ...prevFollowers,
          [holidayCode]: (prevFollowers[holidayCode] || 0) - 1,
        }));
  
        // remove follower
        await axios.post("http://localhost:4000/api/followers/remove",{
          user_code: localStorage.getItem("user_code"),
          vacation_code: holidayCode,
        });
      } else {
        // Follow the vacation
        setFollowingVacations((prevFollowingVacations) => [...prevFollowingVacations, holidayCode]);
        setFollowers((prevFollowers) => ({
          ...prevFollowers,
          [holidayCode]: (prevFollowers[holidayCode] || 0) + 1,
        }));
  
        //add follower
        await axios.post("http://localhost:4000/api/followers/add", {
          user_code: localStorage.getItem("user_code"),
          vacation_code: holidayCode,
        });
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
      if (followingVacations.includes(holidayCode)) {
        setFollowingVacations((prevFollowingVacations) => [...prevFollowingVacations, holidayCode]);
        setFollowers((prevFollowers) => ({
          ...prevFollowers,
          [holidayCode]: (prevFollowers[holidayCode] || 0) + 1,
        }));
      } else {
        setFollowingVacations((prevFollowingVacations) =>
          prevFollowingVacations.filter((code) => code !== holidayCode)
        );
        setFollowers((prevFollowers) => ({
          ...prevFollowers,
          [holidayCode]: (prevFollowers[holidayCode] || 0) - 1,
        }));
      }
    }
  };
  //handleedit
  const handleEdit = (holidayCode: number) => {
    navigate(`/editvacation/${holidayCode}/`);
  };
  const handleDelete = (holidayCode: number) => {
    setDeletingVacationCode(holidayCode);
  };
  const confirmDelete = async () => {
    if (deletingVacationCode) {
      try {
        const response = await axios.delete(`http://localhost:4000/api/holidays/delete/${deletingVacationCode}`);
        if (response.status === 200) {
          setVacations((prevVacations) => prevVacations.filter((v) => v.holidayCode !== deletingVacationCode));
        } else {
          throw new Error("Failed to delete vacation");
        }
      } catch (error) {
        console.error("Error deleting vacation:", error);
      } finally {
        setDeletingVacationCode(null);
      }
    }
  };
  const cancelDelete = () => {
    setDeletingVacationCode(null);
  };
  //Filter button functions:
  const handleFollowingFilter = () => {
    setShowFollowed(!showFollowed);
  };
  const handleActiveFilter = () => {
    setShowActive(!showActive);
  };
  const handleNotStartedFilter = () => {
    setShowUpcoming(!showUpcoming);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const ITEMS_PER_PAGE = 10;
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const filteredVacations = vacations.filter((vacation) => {
    const currentDate = new Date();
    if (showFollowed && !followingVacations.includes(String(vacation.holidayCode))) {
      return false;
    }
    if (showActive && vacation.holidayStartDate > currentDate) {
      return false;
    }
    if (showUpcoming && vacation.holidayStartDate <= currentDate) {
      return false;
    }
    return true;
  });
  
  const currentItems = filteredVacations.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredVacations.length / ITEMS_PER_PAGE);

  // Get the user_type from the localStorage
  const user_type = localStorage.getItem("user_type");

  return (
    <div>
       <div className="logout-container">
        <LogoutButton />
      </div>
      <div className="filter-buttons">
        <label>
          <input type="checkbox" checked={showFollowed} onChange={handleFollowingFilter} />
          Show followed vacations
        </label>
        <label>
          <input type="checkbox" checked={showActive} onChange={handleActiveFilter} />
          Show active vacations
        </label>
        <label>
          <input type="checkbox" checked={showUpcoming} onChange={handleNotStartedFilter} />
          Show upcoming vacations
        </label>
      </div>
      <div className="Vacations">
        {currentItems.map((vacation) => (
          <div className="vacation-box" key={vacation.holidayCode}>
            <div className="vacation-image">
              <img src={vacation.holidayImage} alt={vacation.holidayDestination} />
             {user_type !== "admin" && (
              <button
                className={`heart-btn ${followingVacations.includes(String(vacation.holidayCode)) ? "active" : ""}`}
                onClick={() => toggleFollow(String(vacation.holidayCode))}
              >
                {followingVacations.includes(String(vacation.holidayCode)) ? (
                  <FaHeart color="red" />
                ) : (
                  <FaRegHeart />
                )}
                <span className="follower-count">{followers[vacation.holidayCode] || 0}</span>
              </button>)}
            </div>
            <div className="vacation-details">
              <h3>{vacation.holidayDestination}</h3>
              <p>{vacation.holidayDescription}</p>
              <p>Start Date: {vacation.holidayStartDate.toDateString()}</p>
              <p>End Date: {vacation.holidayEndDate.toDateString()}</p>
              <p>Price: {vacation.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
              <p>
                {followingVacations.includes(String(vacation.holidayCode))
                  ? "You are following this vacation"
                  : "You are not following this vacation"}
              </p>
      
            </div>
            <div className="vacation-actions">
              {user_type === "admin" && (
                <>
                  <button className="vacation-edit" onClick={() => handleEdit(Number(vacation.holidayCode))}>
                    Edit
                  </button>
                  <button
                    className="vacation-delete"
                    onClick={() => handleDelete(Number(vacation.holidayCode))}
                    disabled={deletingVacationCode !== null}>
                    Delete
                  </button>
                </>
              )}
              {deletingVacationCode === vacation.holidayCode && (
                <div className="confirmation-window">
                  <p>Are you sure you want to delete the vacation?</p>
                  <button className="confirm-btn" onClick={confirmDelete}>
                    Yes
                  </button>
                  <button className="cancel-btn" onClick={cancelDelete}>
                    No
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        //breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageChange}
        pageRangeDisplayed={10}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default Vacations;
