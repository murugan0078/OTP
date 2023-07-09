import React, { useEffect, useState } from 'react';
import InputField from '../ReusableComponent/InputField';
import useInput from '../CustomHook/useInput';
import './dashboard.css';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useInput('');
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div id='flex'>
            <div className='text'>
                <h1>Dashboard</h1>
                <InputField
                    type="text"
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search"
                />
            </div>
            <div className="card-list">
                {filteredData.map((item) => (
                    <div
                        key={item.id}
                        className="card"
                        onClick={() => handleItemClick(item)}
                    >
                        <h3>{item.title}</h3>

                    </div>
                ))}
            </div>
            {selectedItem && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>{selectedItem.title}</h3>
                        <p>{selectedItem.body}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
