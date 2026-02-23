
import React,{useState} from 'react';

interface SearchBarPropos{
    onSearch:(query:string)=>void;
    onFilterChange:(sector:string)=>void;
    placeholder?:string;
}

const Searchbar:React.FC<SearchBarPropos>=({
    onSearch,
    onFilterChange,
    placeholder="Search stocks...",
})=>{
    const [query,setQuery]=useState('');
    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setQuery(e.target.value);
        onSearch(e.target.value);

    };
    const handleKeyDown=(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if (e.key==="Enter") onSearch(query);
        if (e.key==="Escape") {setQuery('');onSearch('');}
    };

    const handleClear=(e :React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        setQuery('');
        onSearch('');
    };

    const handleSectorChange=(e :React.ChangeEvent<HTMLSelectElement>)=>{
        onFilterChange(e.target.value);
    };
    return (
        <div>
            <input value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            />
            <button onClick={handleClear}>Clear</button>
            <select onChange={handleSectorChange}>
                <option value="">All Sectors</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Automotive">Automotive</option>
            </select>
        </div>
    )
}
export default Searchbar;