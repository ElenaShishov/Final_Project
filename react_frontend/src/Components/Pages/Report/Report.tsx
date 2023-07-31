import React, { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { CSVLink } from 'react-csv';
import './Report.css';

interface VacationData {
  holidayCode: number;
  holidayDestination: string;
  followers: number;
}

const VacationReport: React.FC = () => {
  const [vacationData, setVacationData] = useState<VacationData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/holidays/getAll');
        if (!response.ok) {
          throw new Error('Failed to fetch vacations');
        }
        const vacationsData = await response.json();
        const fetchedVacations: VacationData[] = vacationsData.map((vacation: any) => {
          return {
            holidayCode: vacation.holidayCode,
            holidayDestination: vacation.holidayDestination,
            followers: 0,
          };
        });

        setVacationData(fetchedVacations);
        fetchFollowersCount(fetchedVacations);
      } catch (error) {
        console.error('Error fetching vacations:', error);
      }
    };

    const fetchFollowersCount = async (vacations: VacationData[]) => {
      try {
        for (const vacation of vacations) {
          const response = await fetch(`http://localhost:4000/api/followers/getById/${vacation.holidayCode}`);
          if (!response.ok) {
            throw new Error('Failed to fetch followers');
          }
          const followersData = await response.json();
          const followersCount = followersData.vacationFollowers;
          setVacationData(prevVacationData => {
            return prevVacationData.map(vacationItem => {
              if (vacationItem.holidayCode === vacation.holidayCode) {
                return { ...vacationItem, followers: followersCount };
              }
              return vacationItem;
            });
          });
        }
      } catch (error) {
        console.error('Error fetching followers count:', error);
      }
    };

    fetchData();
  }, []);

  const yTickValues = Array.from(new Set(vacationData.map(item => Math.round(item.followers))));

  // Function to convert vacation data into CSV format
  const convertToCSV = () => {
    const csvData = vacationData.map((item) => ({
      'Holiday Code': item.holidayCode,
      'Holiday Destination': item.holidayDestination,
      'Followers': item.followers,
    }));
    return csvData;
  };

  return (
    <div className="vacation-report-container">
      <h3>Vacation Report of Followers</h3>
      <CSVLink
        data={convertToCSV()}
        filename={'vacation_report.csv'}
        className="download-csv-button">
       <h5> Download CSV</h5>
      </CSVLink>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        width={800}
        height={400}
      >
        <VictoryAxis
          tickFormat={(tick) => vacationData.find((data) => data.holidayCode === tick)?.holidayDestination || ''}
          style={{
            tickLabels: {
              fontSize: 12,
              padding: 8,
              angle: -90,
              fontWeight: 'bold',
              verticalAnchor: 'middle',
              textAnchor: 'end',
              fill: 'black'
              
            },
          }}
          tickCount={vacationData.length}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(t) => `${t}`}
          tickValues={yTickValues}
          style={{
            tickLabels: {
              fontSize: 14,
              padding: 8,
            },
          }}
          tickCount={yTickValues.length}
        />
        <VictoryBar
          data={vacationData}
          x="holidayCode"
          y="followers"
          style={{
            data: {
              fill: 'green',
              width: 20,
            },
            labels: {
              fontSize: 10,
            },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default VacationReport;
