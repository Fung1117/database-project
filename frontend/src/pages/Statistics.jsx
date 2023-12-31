import React, { useState, useEffect, useContext } from 'react';
import { Flex, Empty } from 'antd';
import UserActivity from '../components/UserActivity';
import UserStayTimeChart from '../components/UserStayTimeChart';
import axios from 'axios';

import { UserContext } from '../App';

const Statistics = () => {
    const [data, setData] = useState({ time: [], date: [] });
    const [loading, setLoading] = useState(true);

    const userContext = useContext(UserContext);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}Time`, { params: { uid: userContext.getUserUid() } });
            setData({
                time: response.data.time,
                date: response.data.date
            });
            console.log(data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Flex gap="middle" justify="center" align="center" style={{ width: '100%' }}>
            {data.time.length > 0 && data.date.length > 0 ? (
                <Flex gap="middle" align="center" justify="center" style={{ width: '100%', }}>
                    <UserStayTimeChart data={data} />
                    <UserActivity data={data} />
                </Flex>
            ) : (
                <Empty description="No data available." />
            )}
        </Flex>
    );
};

export default Statistics;