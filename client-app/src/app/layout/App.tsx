import React, { Fragment, SyntheticEvent, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import { NavBar } from '../../features/nav/NavBar';
import agent from '../api/agent';
import { IActivity } from '../models/activity';
import { LoadingComponent } from './LoadingComponent';

export const App = () => {

    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [target, setTarget] = useState('');

    const handleSelectedActivity = (id: string): void => {
        setSelectedActivity(activities.find(el => el.id === id) ?? null);
        setEditMode(false);
    };

    const handleOpenCreateForm = () => {
        setSelectedActivity(null);
        setEditMode(true);
    };

    const handleCreateActivity = (activity: IActivity) => {
        setSubmitting(true);
        agent.Activities.create(activity).then(() => {
            setActivities([...activities, activity]);
            setSelectedActivity(activity);
            setEditMode(false);
        }).then(() => setSubmitting(false));

    };

    const handleEditActivity = (activity: IActivity) => {
        setSubmitting(true);
        agent.Activities.update(activity).then(() => {
            setActivities([...activities.filter(el => el.id !== activity.id), activity]);
            setSelectedActivity(activity);
            setEditMode(false);
        }).then(() => setSubmitting(false));
    };

    const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setSubmitting(true);
        setTarget(event.currentTarget.name);
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(el => el.id !== id)]);
        }).then(() => setSubmitting(false));
    };

    useEffect(() => {
        agent.Activities.list().then(resp => {
            const activities: IActivity[] = resp.map(el => {
                el.date = el.date.split('.')[0];
                return el;
            });
            setActivities(activities);
        }).then(() => setLoading(false));
    }, []);


    if (loading) return <LoadingComponent content='Loading Activities...' />;

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
                    deleteActivity={handleDeleteActivity}
                    submitting={submitting}
                    target={target} />
            </Container>

        </Fragment>
    );

};

export default App;
