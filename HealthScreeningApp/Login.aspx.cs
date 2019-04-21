using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

using entities = SOFARCH.HealthScreening.Entities;
using business = SOFARCH.HealthScreening.Business;

namespace HealthScreeningApp
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Page.IsPostBack == false)
            {
                UserName.Value = "";
                Password.Value = "";

                UserName.Focus();
            }

        }

        protected void ShowMessage(string message)
        {
            var sb = new StringBuilder();

            sb.Append("<script type='text/javascript'>");
            //sb.Append("alert('" + message + "');");
            sb.Append("swal('Error!!!', '" + message + "', 'warning');");
            sb.Append("</script>");

            //Response.Write(sb.ToString());

            alertMessage.Text = sb.ToString();

            Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "alert", sb.ToString());
        }

        protected void LogIn_Click(object sender, EventArgs e)
        {
            if (UserName.Value.Trim() == string.Empty)
            {
                ShowMessage("User Name field should not be left blank.");
                UserName.Focus();
                return;
            }
            else if (Password.Value.Trim() == string.Empty)
            {
                ShowMessage("Password field should not be left blank.");
                Password.Focus();
                return;
            }

            entities.User user = new entities.User();
            business.User _user = new business.User();

            user = _user.GetUserDetails(UserName.Value, Password.Value);

            if (user != null)
            {
                if (user.UserId == 0)
                {
                    ShowMessage("User Not Found.");
                    UserName.Focus();
                    return;
                }
                else
                {
                    Response.Redirect("/HealthScreeningApp/dashboard.aspx", false);
                }
            }
        }
    }
}