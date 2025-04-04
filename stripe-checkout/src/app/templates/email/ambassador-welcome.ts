interface EmailTemplateData {
  firstName: string;
  ambassadorCode: string;
  loginUrl: string;
  dashboardUrl: string;
  supportEmail: string;
}

export const ambassadorWelcomeEmail = {
  subject: (data: EmailTemplateData) => `Welcome to the Brilliant Ambassador Program, ${data.firstName}!`,
  
  text: (data: EmailTemplateData) => `
Welcome to the Brilliant Ambassador Program, ${data.firstName}!

We're thrilled to have you join our community of Kingdom activators who are helping others discover their new normal in Christ.

Your Ambassador Details:
- Ambassador Code: ${data.ambassadorCode}
- Login URL: ${data.loginUrl}
- Dashboard: ${data.dashboardUrl}

Next Steps:
1. Log in to your dashboard using the credentials you created
2. Complete your ambassador profile
3. Watch the quick-start training video
4. Get your unique sharing link
5. Join our next Ambassador Training Call (First Tuesday of each month at 4pm PT)

Important Resources:
- Ambassador Training Portal: Access through your dashboard
- Monthly Training Calls: First Tuesday at 4pm PT
- Support Email: ${data.supportEmail}

Your Ambassador Benefits:
- Share 5-day free trials of the BrilliantPlus app
- Earn commissions on new member subscriptions
- Access exclusive monthly training
- Receive your Brilliant Debit Card (US only)
- Join a community of Kingdom-minded entrepreneurs

Tips for Getting Started:
1. Share your story authentically
2. Focus on the transformation you've experienced
3. Use your unique sharing link for all referrals
4. Engage with the ambassador community
5. Attend monthly training calls

Need Help?
If you have any questions, our support team is here to help at ${data.supportEmail}.

Welcome to the team!

The Brilliant Movement Team
`,

  html: (data: EmailTemplateData) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #264653;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #2A9D8F;
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background-color: #ffffff;
      padding: 30px;
      border-radius: 0 0 8px 8px;
      border: 1px solid #e5e7eb;
    }
    .button {
      display: inline-block;
      background-color: #E9C46A;
      color: #264653;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
      font-weight: bold;
    }
    .section {
      margin: 25px 0;
    }
    .highlight {
      background-color: #f9f5f0;
      padding: 20px;
      border-radius: 6px;
      margin: 15px 0;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to the Brilliant Ambassador Program!</h1>
      <p>We're excited to have you join our community of Kingdom activators</p>
    </div>
    
    <div class="content">
      <h2>Hello ${data.firstName},</h2>
      
      <p>We're thrilled to have you join our community of Kingdom activators who are helping others discover their new normal in Christ.</p>
      
      <div class="highlight">
        <h3>Your Ambassador Details</h3>
        <p><strong>Ambassador Code:</strong> ${data.ambassadorCode}</p>
        <p><strong>Login URL:</strong> <a href="${data.loginUrl}">${data.loginUrl}</a></p>
        <p><strong>Dashboard:</strong> <a href="${data.dashboardUrl}">${data.dashboardUrl}</a></p>
      </div>

      <div class="section">
        <h3>Next Steps</h3>
        <ol>
          <li>Log in to your dashboard using the credentials you created</li>
          <li>Complete your ambassador profile</li>
          <li>Watch the quick-start training video</li>
          <li>Get your unique sharing link</li>
          <li>Join our next Ambassador Training Call (First Tuesday of each month at 4pm PT)</li>
        </ol>
        
        <a href="${data.dashboardUrl}" class="button">Access Your Dashboard</a>
      </div>

      <div class="section">
        <h3>Important Resources</h3>
        <ul>
          <li>Ambassador Training Portal: Access through your dashboard</li>
          <li>Monthly Training Calls: First Tuesday at 4pm PT</li>
          <li>Support Email: <a href="mailto:${data.supportEmail}">${data.supportEmail}</a></li>
        </ul>
      </div>

      <div class="section">
        <h3>Your Ambassador Benefits</h3>
        <ul>
          <li>Share 5-day free trials of the BrilliantPlus app</li>
          <li>Earn commissions on new member subscriptions</li>
          <li>Access exclusive monthly training</li>
          <li>Receive your Brilliant Debit Card (US only)</li>
          <li>Join a community of Kingdom-minded entrepreneurs</li>
        </ul>
      </div>

      <div class="section">
        <h3>Tips for Getting Started</h3>
        <ol>
          <li>Share your story authentically</li>
          <li>Focus on the transformation you've experienced</li>
          <li>Use your unique sharing link for all referrals</li>
          <li>Engage with the ambassador community</li>
          <li>Attend monthly training calls</li>
        </ol>
      </div>

      <div class="highlight">
        <h3>Need Help?</h3>
        <p>If you have any questions, our support team is here to help at <a href="mailto:${data.supportEmail}">${data.supportEmail}</a>.</p>
      </div>

      <div class="footer">
        <p>Welcome to the team!</p>
        <p>The Brilliant Movement Team</p>
      </div>
    </div>
  </div>
</body>
</html>
`
}; 