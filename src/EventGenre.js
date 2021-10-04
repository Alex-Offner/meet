import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import React, { useEffect, useState } from 'react';

const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);

    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular JS'];
    const colours = ['#52D726', '#7CDDDD', '#FF7300', '#FF0000', '#007ED6'];

    const getData = () => {
        let data = genres.map((genre) => {
            const value = events.filter((event) => event.summary.split(' ').includes(genre)).length;

            return { name: genre, value };
        });
        data = data.filter(data => data.value)
        return data;
    };


    useEffect(() => { setData(() => getData()) }, [events]);

    return (
        <ResponsiveContainer height={400} >
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colours[index % colours.length]} name={entry.name} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )

};


export default EventGenre;