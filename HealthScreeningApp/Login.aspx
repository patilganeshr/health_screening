<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="HealthScreeningApp.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head runat="server">
	<title>Login</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />

	<link rel="stylesheet" type="text/css" href="Content/css/vendor/font-awesome/font-awesome.min.css" />
	<link rel="stylesheet" type="text/css" href="Content/css/vendor/bootstrap/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="Content/css/vendor/sweetalert/sweetalert.css" />
	<link rel="stylesheet" type="text/css" href="Content/css/app/login.css" />

	<script type="text/javascript">
			var SERVICE_PATH = "<%= System.Configuration.ConfigurationManager.AppSettings["ServicePath"].ToString() %>";
			var ROOT_PATH = "<%= System.Configuration.ConfigurationManager.AppSettings["rootpath"].ToString() %>";
			var IP_ADDRESS = "<%= Request.ServerVariables["REMOTE_ADDR"] %>";
		</script>
</head>
<body>
	<form id="form1" runat="server">

		<div class="container">
			<div class="row">
				<div class="col-md-4 col-md-offset-4">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title">Please sign in</h3>
						</div>
						<div class="panel-body">
							<fieldset>
								<div class="form-group">
									<input class="form-control" id="UserName" placeholder="E-mail" name="email" type="text" runat="server" />
								</div>
								<div class="form-group">
									<input class="form-control" id="Password" placeholder="Password" name="password" type="password" runat="server" value="" />
								</div>
								<div class="checkbox">
									<label>
										<input name="remember" type="checkbox" value="Remember Me" />
										Remember Me
						
									</label>
								</div>
								<%--<button type="button" id="LogIn" class="btn btn-lg btn-success btn-block">Log In</button>--%>
								<asp:Button ID="LogIn" runat="server" CssClass="btn btn-success btn-md" Text="Log in" OnClick="LogIn_Click" />
							</fieldset>

						</div>

					</div>

				</div>

			</div>

		</div>

	</form>

	<script src="Content/scripts/vendor/jquery/jquery-3.1.1.min.js"></script>
	<script src="Content/scripts/vendor/sweetalert/sweetalert.min.js"></script>

	<%--<script src="Content/scripts/app/shared/default.js"></script>
	<script src="Content/scripts/app/admin/login.js"></script>--%>

	<asp:Literal ID="alertMessage" runat="server"></asp:Literal>

</body>
</html>
