import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

export default connect(({users}) => { return {users};})((props) => {
  let options = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
  return [options];
});

function User(props) {
  let {user} = props;
    return <option value={user.id}>{user.first_name + ' ' + user.last_name}</option>;
}