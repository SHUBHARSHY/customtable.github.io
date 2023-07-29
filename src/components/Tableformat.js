import React,{useState,useEffect} from 'react'
import data from "./datatables.json";
import './Newtable.css'

const Tableformat = () => {
    const [sortedData, setSortedData] = useState(data); //for mapping
    const [currentPage, setCurrentPage] = useState(1);   // for mapping, selecting items per page and pagination
    const [itemsPerPage, setItemsPerPage] = useState(10); // for items per page

    const [searchQuery, setSearchQuery] = useState(""); // for search
    const [originalData, setOriginalData] = useState(data);  // for search

    const [sortBy, setSortBy] = useState(null);  // for sorting table
    const [sortOrder, setSortOrder] = useState("asc"); // for sorting table



    // declaring const variable for maping
    const currentPageData = sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );



      //  function called to change the page size or rows per page
    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1); // Reset to the first page when changing items per page
      };



      // function called for pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
      };
      const totalPages = Math.ceil(sortedData.length / itemsPerPage);



        //    search filter fuctionality
      const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
      };


      const searchFilter = (data, query) => {
        if (!query) {
          return data;
        }
        
        const lowerCaseQuery = query.toLowerCase();
        return data.filter(
  
          (event) =>
            event.id.toLowerCase().includes(lowerCaseQuery) ||
            event.name.toLowerCase().includes(lowerCaseQuery) ||
            event.position.toLowerCase().includes(lowerCaseQuery) ||
            event.office.toLowerCase().includes(lowerCaseQuery) ||
            event.age.toLowerCase().includes(lowerCaseQuery) ||
            event.date.toLowerCase().includes(lowerCaseQuery) ||
            event.salary.toLowerCase().includes(lowerCaseQuery)
        );
      };
  
      
        // useEffect for search filter
    useEffect(() => {
        const filteredData = searchFilter(originalData, searchQuery);
        setSortedData(filteredData);
        setCurrentPage(1); // Reset to the first page when changing the search query
      }, [searchQuery]);





//   for sorting table selectively
      const sortData = () => {
        if (!sortBy) {
          setSortedData([...data]);
        } 
        else {
          const sortedArray = [...sortedData].sort((a, b) => {
            if (sortBy === "id" || sortBy === "age" || sortBy === "salary") {
              return sortOrder === "asc" ? parseInt(a[sortBy]) - parseInt(b[sortBy]) : parseInt(b[sortBy]) - parseInt(a[sortBy]);
            } 
            else {
              const comparison = a[sortBy].localeCompare(b[sortBy]);
              return sortOrder === "asc" ? comparison : -comparison;
            }
          });
          setSortedData(sortedArray);
        }
      };

      

      useEffect(() => {
        sortData();
      }, [sortBy, sortOrder]);


      const handleSort = (field) => {
        if (sortBy === field) {
          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
          setSortBy(field);
          setSortOrder("asc");
          
        }
      };
    

      // useEffect(() => {
      //   setOriginalData(data);
      //   setSortedData(data);
      //   setCurrentPage(1);
      // }, [data]);
  
  return (
    <div>
      <label>
          Rows per page:
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option  value={10}>10</option>
          <option  value={20}>20</option>
          <option  value={30}>30</option>
          <option  value={50}>50</option>
        </select>
        </label>

        <input
          type="search"
          placeholder="Search for an item..."
          value={searchQuery}
          onChange={handleSearchChange}
        />

<table>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              ID {sortBy === "id" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("name")} >
              Name {sortBy === "name" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("position")}>
              Position {sortBy === "position" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("office")}>
              Office {sortBy === "office" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("age")}>
              Age {sortBy === "age" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("date")}>
              Date {sortBy === "date" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("salary")} >
              Salary {sortBy === "salary" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((person, index) => (
            <tr key={index}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.position}</td>
              <td>{person.office}</td>
              <td>{person.age}</td>
              <td>{person.date}</td>
              <td>{person.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>

<button
  onClick={() => handlePageChange(currentPage - 1)}
  disabled={currentPage === 1} 
>
  Previous
</button>

<span>Page{currentPage} </span>

<button
  onClick={() => handlePageChange(currentPage + 1)}
  disabled={currentPage === totalPages}
>
  Next
</button>
</div>
    </div>
  )
}

export default Tableformat
