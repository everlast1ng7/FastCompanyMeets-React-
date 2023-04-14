import React, { useState } from 'react';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.css';

const Usrs = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const renderRow = () => {
       return users.map((user) => {
          return  <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.qualities.map((item) => {
                   return <span className={"badge m-1 bg-" + item.color} key={user._id}>{item.name}</span>
                })}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td><button className="btn btn-danger" onClick={((e) => handleDelete(user._id))}>Удалить</button></td>
            </tr>
        });
    };

    const handleDelete = (userId) => {
        setUsers(users.filter((item) => item._id !== userId));
    };

    const renderPhrase = (number) => {
        if (number > 4 && number < 15) return `${number} человек тусанет с тобой`;
        if (number < 2) return `${number} человек тусанет с тобой`;
        if (number > 1 && number < 5) return `${number} человека тусанет с тобой`;
    }

    return (
        <>
        <h2>
            <span className={'badge bg-' + (users.length > 0 ? "primary" : "danger")}>
                {/* {users.length > 0 ? `${renderPhrase()} человек тусанет с тобой сегодня` : "Никто с тобой не тусанет"} */}
                {renderPhrase(users.length)}
            </span>
        </h2>
        <div>
        {users.length > 0 &&
        <table class="table">
        <thead>
            <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качество</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th />
            </tr>
        </thead>
        <tbody>
            {renderRow()}
        </tbody>
        </table>
        }
        </div>
        </>
    )
}

export default Usrs;