export default (user) => ({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    fullName: user.full_name,
    email: user.email,
    mobile: user.mobile,
    createdAtText: user.created_at_text
})