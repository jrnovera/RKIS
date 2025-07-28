import React from 'react';
import Modal from 'react-modal';
import { FaUser } from 'react-icons/fa';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProfileViewModal = ({ isOpen, onClose, person }) => {
    if (!person) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="IP Profile"
            style={modalStyles}
            appElement={document.getElementById('root')}
        >
            <div style={styles.modalContent}>
                {/* Column 1: Profile Card */}
                <div style={styles.column}>
                    <div style={styles.profileCard}>
                        <FaUser size={100} color="black"/>
                    </div>
                    <div style={styles.profileDetails}>
                        <p style={styles.profileName}>{person.name}</p>
                        <span><strong>Date of Birth:</strong> {person.birthdate}</span>
                        <span><strong>Gender:</strong> {person.gender}</span>
                        <span><strong>Age:</strong> {person.age}</span>
                        <span><strong>Barangay:</strong> {person.barangay}</span>
                        <span><strong>Occupation:</strong> {person.occupation}</span>
                        <span><strong>Health Condition:</strong> {person.healthCondition}</span>
                        <div style={styles.household}>
                            <strong>Household Members:</strong>
                            <ul>
                                {person.household && person.household.map((member, i) => (
                                    <li key={i}>{member}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Column 2: Graphs */}
                <div style={styles.column}>
                    <h2 style={styles.columnHeader}>Statistics</h2>
                    <div style={styles.graphContainer}>
                        <div style={{width: '80px', height: '80px' }}>
                            <CircularProgressbar value={70} text="70%" styles={{
                                path: { stroke: 'orange', strokeLinecap: 'round' },
                                trail: { stroke: 'gray' },
                                text: { fill: '#333', fontSize: '20px', fontWeight: 'bold' },
                            }}/>
                            <p style={{textAlign: 'center'}}>Aeta</p>
                        </div>
                        <div style={{width: '80px', height: '80px'}}>
                            <CircularProgressbar value={30} text="30%" styles={{
                                path: { stroke: 'lightblue', strokeLinecap: 'round' },
                                trail: { stroke: 'gray' },
                                text: { fill: '#333', fontSize: '20px', fontWeight: 'bold' },
                            }}/>
                               <p style={{textAlign: 'center'}}>Cebuano</p>
                        </div>
                    </div>
                </div>

                {/* Column 3: Family Tree */}
                <div style={styles.column}>
                    <h2 style={styles.columnHeader}>Family Tree</h2>
                    <div className="family-tree">
                        <div className="tree-level">
                            <div className="tree-node">
                                <FaUser size={40} />
                                <span>{person.father_name || 'N/A'}</span>
                                <small>(Father)</small>
                            </div>
                            <div className="tree-node">
                                <FaUser size={40} />
                                <span>{person.mother_name || 'N/A'}</span>
                                <small>(Mother)</small>
                            </div>
                        </div>
                        <div className="tree-level">
                             <div className="tree-node">
                                <FaUser size={40} />
                                <span>{person.name}</span>
                                <small>(You)</small>
                            </div>
                            <div className="tree-node">
                                <FaUser size={40} />
                                <span>{person.spouse_name || 'N/A'}</span>
                                <small>(Spouse)</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProfileViewModal;

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '1000px',
        padding: '20px',
        borderRadius: '10px',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
};

const styles = {
    modalContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '20px',
    },
    column: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
    },
    columnHeader: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '15px',
        textAlign: 'center',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px',
    },
    profileCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px',
        textAlign: 'center',
    },
    profileName: {
        fontSize: '24px',
        fontWeight: 'bold',
        margin: '10px 0 0 0',
        lineHeight: '1.2',
    },
    profileDetails: {
        display: 'flex',
        flexDirection: 'column',
    },
    household: {
        marginTop: '10px',
    },
    graphContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '20px',
        marginTop: '20px',
    },
};
