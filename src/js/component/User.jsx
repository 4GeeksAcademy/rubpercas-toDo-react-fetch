import React, { useState } from 'react';
import Modal from 'react-modal';

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [userName, setUserName] = useState('');

    const handleInputChange = (event) => {
        setUserName(event.target.value);
    };

    const handleSubmit = () => {
        // ...
        setIsModalOpen(false);
    };

    return (
        <div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Example Modal"
            >
                <input type="text" value={userName} onChange={handleInputChange} />
                <button onClick={handleSubmit}>Continuar</button>
            </Modal>
            {!isModalOpen && (
                <div>
                    <p>Hola, {userName}!</p>
                </div>
            )}
        </div>
    );
};

export default App;