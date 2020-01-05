import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/activityStore';

const ActivityList: React.FC = () => {

    const { activitiesByDate, selectActivity, deleteActivity, submitting, target } = useContext(ActivityStore);

    return (
        <div>
            <Segment clearing>

                <Item.Group divided>
                    {
                        activitiesByDate.map(activity =>
                            (
                                <Item key={activity.id}>
                                    <Item.Content>
                                        <Item.Header as='a'>{activity.title}</Item.Header>
                                        <Item.Meta>{activity.date}</Item.Meta>
                                        <Item.Description>
                                            <div>{activity.description}</div>
                                            <div>{activity.city}, {activity.venue}</div>
                                        </Item.Description>
                                        <Item.Extra>
                                            <Button
                                                floated='right'
                                                content='View'
                                                color='blue'
                                                onClick={() => selectActivity(activity.id)} />
                                            <Button
                                                name={activity.id}
                                                floated='right'
                                                content='Delete'
                                                color='red'
                                                onClick={(event) => deleteActivity(event, activity.id)}
                                                loading={target === activity.id && submitting} />
                                            <Label basic content={activity.category} />
                                        </Item.Extra>
                                    </Item.Content>
                                </Item>
                            )
                        )
                    }
                </Item.Group>

            </Segment>

        </div>
    );
};

export default observer(ActivityList);