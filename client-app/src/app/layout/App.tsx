import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import { NavBar } from '../../features/nav/NavBar';
import { IActivity } from '../models/activity';

export const App = () => {

    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);

    const handleSelectedActivity = (id: string): void => {
        setSelectedActivity(activities.find(el => el.id === id) ?? null);
        setEditMode(false);
    };

    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true);
    };

    const handleCreateActivity = (activity: IActivity) => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
    };

    const handleEditActivity = (activity: IActivity) => {
        setActivities([...activities.filter(el => el.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
    };

    const handleDeleteActivity = (id: string) => {
        setActivities([...activities.filter(el => el.id !== id)]);
    };

    useEffect(() => {
        axios.get<IActivity[]>('http://localhost:5000/api/activities')
            .then(resp => {
                const activities: IActivity[] = resp.data.map(el => {
                    el.date = el.date.split('.')[0];
                    return el;
                });
                setActivities(activities);
            });
    }, []);

    return (
        <Fragment>

            <NavBar openCreateForm={handleOpenCreateForm} />

            <Container style={{ marginTop: '7em' }}>
                <ActivityDashboard
                    activities={activities}
                    selectActivity={handleSelectedActivity}
                    selectedActivity={selectedActivity}
                    setSelectedActivity={setSelectedActivity}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    createActivity={handleCreateActivity}
                    editActivity={handleEditActivity}
                    deleteActivity={handleDeleteActivity} />
            </Container>

        </Fragment>
    );

};

export default App;
