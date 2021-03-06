import { observer } from 'mobx-react-lite';
import React, { FormEvent, useContext, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { IActivity } from '../../../app/models/activity';
import ActivityStore from '../../../app/stores/activityStore';

const ActivityForm: React.FC = () => {

    const { createActivity, editActivity, toggleEditFrom, selectedActivity, submitting } = useContext(ActivityStore);

    const initializeForm = () => {
        if (selectedActivity) {
            return selectedActivity;
        } else {
            return {
                id: '',
                title: '',
                description: '',
                category: '',
                date: '',
                city: '',
                venue: ''
            };
        }
    };

    const [activity, setActivity] = useState<IActivity>(initializeForm);

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = { ...activity, id: uuid() };
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    };

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value });
    };

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    placeholder='Title'
                    onChange={handleInputChange}
                    name='title' value={activity.title} />

                <Form.TextArea
                    rows={2}
                    onChange={handleInputChange}
                    name='description'
                    placeholder='Description'
                    value={activity.description} />

                <Form.Input
                    placeholder='Category'
                    onChange={handleInputChange}
                    name='category'
                    value={activity.category} />

                <Form.Input
                    type='datetime-local'
                    onChange={handleInputChange}
                    name='date'
                    placeholder='Date'
                    value={activity.date} />

                <Form.Input
                    placeholder='City'
                    onChange={handleInputChange}
                    name='city'
                    value={activity.city} />

                <Form.Input
                    placeholder='Venue'
                    onChange={handleInputChange}
                    name='venue'
                    value={activity.venue} />

                <Button
                    floated='right'
                    positive
                    type='submit'
                    content='Submit'
                    loading={submitting} />

                <Button
                    floated='right'
                    type='button'
                    onClick={() => toggleEditFrom(undefined, false)}
                    content='Cancel' />
            </Form>
        </Segment>
    );
};

export default observer(ActivityForm);