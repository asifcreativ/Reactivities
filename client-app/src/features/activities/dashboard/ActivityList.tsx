import React, { SyntheticEvent } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

interface IProp {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;
}

export const ActivityList: React.FC<IProp> = ({
    activities,
    selectActivity,
    deleteActivity,
    submitting,
    target
}) => {

    return (
        <div>
            <Segment clearing>

                <Item.Group divided>
                    {
                        activities.map(activity =>
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
