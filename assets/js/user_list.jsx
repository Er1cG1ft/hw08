import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

export default connect(({users}) => { return {users};})((props) => {
  let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
  return <div className="row mt-5">
    <div className="col-12">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Admin?</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  </div>;
});

function User(props) {
  let {user} = props;
  return <tr>
    <td>{user.email}</td>
    <td>{user.first_name}</td>
    <td>{user.last_name}</td>
    <td>{user.admin ? "yes" : "no"}</td>
  </tr>;
}