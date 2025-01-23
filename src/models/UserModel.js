export default (user) => ({
  id: user.id,
  status: user.status,
  statusText: user.status_text,
  statusValue: {
    label: user.status_text,
    value: user.status,
  },
  type: user.type,
  typeText: user.type_text,
  typeValue: {
    label: user.type_text,
    value: user.type,
  },
  firstName: user.first_name,
  lastName: user.last_name,
  fullName: user.full_name,
  email: user.email,
  mobile: user.mobile,
  nationalCode: user.national_code,
  createdAtText: user.created_at_text,
});
