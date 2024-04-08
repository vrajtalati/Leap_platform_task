All api Endpoints </br></br></br>
1. Create a New User

Endpoint: POST /user

Description: Creates a new user with the provided name.

Example:
json
{
  "name": "John Doe"
}</br></br>


2. Create a New Mentor
   
Endpoint: POST /mentor

Description: Creates a new mentor with the provided name.

Example:
json
Copy code
{
  "name": "Jane "
}</br></br>


3. Rate a Mentor

Endpoint: POST /rate-mentor/:mentorName

Description: Updates the rating of the specified mentor.



Example:
json
{
  "rating": 4
}
</br></br>

4. Add Review for a Mentor
   
Endpoint: POST /review-mentor/:mentorName

Description: Adds a review for the specified mentor.

Example:
json
{
  "reviewText": "Great mentor!"
}
</br></br>

5. Retrieve Certificate for a Student
   
Endpoint: GET /student_certificate/:studentName

Example URL: /student_certificate/John Doe

</br></br>
6. Retrieve Mentor Details
   
Endpoint: GET /mentor_details/:mentorName

Description: Retrieves the rating of the specified mentor.

Example URL: /mentor_details/Jane Smith
