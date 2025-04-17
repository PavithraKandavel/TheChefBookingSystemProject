# **Chef Booking Web Application**

## **Project Title**
**Chef Booking Web Application** – A platform for users to book professional chefs for personalized cooking experiences.

---

## **Project Description**
The **Chef Booking Web Application** is designed to connect users with professional chefs, allowing them to browse, book, and communicate with chefs for private cooking services. The platform provides a seamless experience for both users and chefs, featuring **secure authentication**, **profile management**, and **booking functionalities**.

### **Why This Project?**
- **Bridges the gap** between users looking for personalized meals and professional chefs.
- **Enhances convenience** by allowing seamless online bookings and secure payments.
- **Supports chefs** by providing a marketplace for their services.

### **Technology Stack**
| **Technology** | **Purpose** |
|--------------|-------------|
| **React.js** | Frontend UI |
| **Node.js & Express.js** | Backend API |
| **MongoDB / MySQL** | Database |
| **JWT Authentication** | Secure user authentication |
| **CSS / Tailwind** | Styling and UI design |

### **Challenges Faced**
- **Authentication Complexity**: Secure login & role-based access control for users and chefs.
- **Real-Time Booking Conflicts**: Managing chef availability efficiently.
- **Frontend Performance**: Ensuring smooth and responsive UI across devices.

### **Future Enhancements**
- **Integrated Payment System**: Secure online transactions.
- **Push Notifications**: Notify users and chefs about bookings and cancellations.
- **AI-Powered Chef Recommendations**: Personalized suggestions based on user preferences.

---

## **How to Install and Run the Project**

### **Frontend Setup**
1. **Clone the repository**:
   ```sh
   git clone https://github.com/PavithraKandavel/TheChefBookingSystemProject.git
   cd TheChefBookingSystemProject
   ```

2. **Open the project in VS Code**.
   
4. **Navigate to the frontend folder**:
    '''sh
     cd frontend
   '''

5. **Install dependencies**:
   ```sh
   npm install
   ```

6. **Start the development server**:
   ```sh
   npm start
   ```
   The application will launch automatically in **Chrome Browser**.

---

### **Backend Setup**
1. **Download and Install Node.js**  
   [Download Node.js](https://nodejs.org/en/download)

2. **Navigate to the backend folder**:
   ```sh
   cd backend
   ```

3. **Install dependencies**:
   ```sh
   npm install
   ```

4. **Start the backend server**:
   ```sh
   node index.js
   ```

5. **API Documentation**  
   [View API Docs](https://docs.google.com/document/d/1JlO2ibW97d4q59OIDXgjMeBk13y_A8B8Ggktl6q-WxA/edit?tab=t.0)

---

## **How to Use the Project**
### **User Flow**
1. **User Signup/Login**
   - Users can create an account or log in using credentials.
   - Chefs also need to sign up separately.

2. **Browsing & Booking**
   - Users can browse available chefs.
   - Users can book a chef for a specific time and date.

3. **Dashboard**
   - Users can manage their bookings and past orders.
   - Chefs can update their availability and manage requests.

4. **Profile Management**
   - Users and chefs can update their profiles, including images, descriptions, and preferences.

## **Development Activity Schedule**
| **Phase**      | **Task**                                       | **Estimated Completion** |
|---------------|-----------------------------------------------|-------------------------|
| **Phase 1**   | Set up project repository and folder structure | Week 1 |
| **Phase 2**   | Implement authentication for users and chefs   | Week 2 |
| **Phase 3**   | Develop booking system for users & chefs       | Week 3 |
| **Phase 4**   | Frontend UI development                        | Week 4 |
| **Phase 5**   | API integration with frontend                 | Week 5 |
| **Phase 6**   | Testing and bug fixes                         | Week 6 |
| **Phase 7**   | Deployment and final review                   | Week 7 |

---

## **Authentication Credentials (For Testing)**
| **Role** | **Username** | **Password** |
|---------|------------|------------|
| **User** | user@example.com | user123 |
| **Chef** | chef@example.com | chef123 |

> _Note: These credentials are for testing purposes only. Update passwords before deployment._

---


---

## **Contributors**
- **Pavithra Kandavel**
- 
## **How to Contribute to the Project**
We welcome contributions from the community! To contribute:

1. **Fork the repository** on GitHub.
2. **Clone your fork**:
   ```sh
   git clone https://github.com/PavithraKandavel/TheChefBookingSystemProject.git
   ```
3. **Create a new branch**:
   ```sh
   git checkout -b feature-branch-name
   ```
4. **Make your changes** and commit them.
5. **Push the changes** to your forked repository:
   ```sh
   git push origin feature-branch-name
   ```
6. **Submit a pull request**.

## **Include Tests (Manual Testing)**
While automated testing is planned for future development, manual testing can be done using the following steps:

1. **Frontend Testing**:
   - Navigate through pages and check UI responsiveness.
   - Validate booking process and form inputs.
   - Ensure correct redirections after login/signup.

2. **Backend Testing**:
   - Use Postman or cURL to test API endpoints.
   - Verify correct authentication and authorization flows.
   - Test database queries and data integrity.
---


