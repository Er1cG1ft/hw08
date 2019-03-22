import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

export default connect(({users}) => { return {users};})((props) => {
  let name = _.map(props.users, (uu) => <User key={uu.id} user={uu} user_name={props.user_id} />);
  return name;
});

function User(props) {
  let {user, user_name} = props;
  if (user.id == user_name) {
    return <span>{user.first_name + ' ' + user.last_name}</span>;
  } else {
    return null;
  }
}