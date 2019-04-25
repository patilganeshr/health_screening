using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Text;

using entities = SOFARCH.HealthScreening.Entities;
using business = SOFARCH.HealthScreening.Business;

namespace HealthScreeningApp
{
    public partial class Site_Mobile : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        if (!Page.IsPostBack)
            {
                if (Session["USER_ID"] == null)
                {
                    Session["RedirectURL"] = Request.RawUrl.ToString();
                    Response.Redirect(Get_Base_Url() + "/Login.aspx?redirect=" + Request.RawUrl.ToString(), true);
                }

                Load_References();

                Load_Menu();

                //UsageLog();                
            }

        }

        public string Get_Base_Url()
        {
            string strUrl = null;

            //strUrl = "http://" + HttpContext.Current.Request.Url.Host.ToString() + ":" + HttpContext.Current.Request.Url.Port.ToString() + Request.RawUrl.Substring(0, Request.RawUrl.IndexOf("/", 1));
            //strUrl = "http://" + HttpContext.Current.Request.Url.Host.ToString() + ":" + HttpContext.Current.Request.Url.Port.ToString();
            strUrl = "http://" + HttpContext.Current.Request.Url.Host.ToString() + System.Configuration.ConfigurationManager.AppSettings["rootpath"];
            return strUrl;
        }

        private List<string> GetCSSFiles()
        {
            var vendorPath = "content/css/vendor/";
            var appPath = "content/css/app/";

            var files = new List<string>
            {
                vendorPath + "bootstrap/bootstrap.min.css",
                vendorPath + "bootstrap-touchspin/jquery.bootstrap-touchspin.min.css",
                vendorPath + "font-awesome/font-awesome.min.css",
                vendorPath + "animate/animate.css",
                //vendorPath + "pikaday/pikaday.css",
                vendorPath + "select2/select2.min.css",
                vendorPath + "sweetalert/sweetalert.css",
                vendorPath + "bootstrap-datetimepicker/bootstrap-datetimepicker.min.css",
                //vendorPath + "input-mask/inputmask.css",
                appPath + "colors-background.css",
                appPath + "colors-buttons.css",
                appPath + "colors-text.css",
                appPath + "bootstrap-custom-style.css",
                appPath + "app.css"
            };

            return files;
        }

        private List<string> GetJSFiles()
        {
            var vendorPath = "content/scripts/vendor/";
            var appPath = "content/scripts/app/";

            var files = new List<string>
            {
                vendorPath + "modernizr/modernizr-2.8.3.js",
                vendorPath + "jquery/jquery-3.1.1.min.js",
                vendorPath + "pikaday/moment.js",
                vendorPath + "pikaday/moment-with-locales.js",
                vendorPath + "bootstrap/transition.js",
                vendorPath + "bootstrap/collapse.js",
                vendorPath + "bootstrap/bootstrap.min.js",
                vendorPath + "bootstrap-touchspin/jquery.bootstrap-touchspin.js",
                vendorPath + "bootstrap-datetimepicker/bootstrap-datetimepicker.min.js",
                //vendorPath + "pikaday/pikaday.js",
                //vendorPath + "pikaday/pikaday.jquery.js",
                vendorPath + "select2/select2.min.js",
                vendorPath + "sweetalert/sweetalert.min.js",
                //vendorPath + "input-mask/inputmask.dependencyLib.jquery.min.js",
                //vendorPath + "input-mask/jquery.inputmask.min.js",
                //vendorPath + "input-mask/inputmask.date.extensions.min.js",
                //vendorPath + "input-mask/inputmask.numeric.extensions.min.js",
                //vendorPath + "input-mask/inputmask.regex.extensions.min.js",
                //appPath + "CCSCore.js",
                appPath + "app.js"
            };

            return files;
        }

        private void Load_References()
        {
            //Page.Header.Controls.Add(Create_CSS_Link("https://fonts.googleapis.com/css?family=Lato:300,400,400italic,600,700|Raleway:300,400,500,600,700|Crete+Round:400italic", String.Empty));
            //Page.Header.Controls.Add(Create_CSS_Link("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,600,600i|Montserrat:400,500,600|Work+Sans:400,500,600", string.Empty));
            Page.Header.Controls.Add(Create_CSS_Link("https://fonts.googleapis.com/css?family=Muli:400,400i,600", string.Empty));
            //Page.Header.Controls.Add(Create_CSS_Link("https://fonts.googleapis.com/css?family=Roboto:400,500|Montserrat:400,500,600", string.Empty));
            //Page.Header.Controls.Add(Create_CSS_Link("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,600,600i", string.Empty));
            //Page.Header.Controls.Add(Create_CSS_Link("https://fonts.googleapis.com/css?family=Raleway:400,500,600", string.Empty));

            var cssFiles = new List<string>();

            cssFiles = GetCSSFiles();

            if (cssFiles.Count > 0)
            {
                foreach (string item in cssFiles)
                {
                    Page.Header.Controls.Add(Create_CSS_Link(Get_Base_Url() + item, string.Empty));
                }
            }

            var jsFiles = new List<string>();

            jsFiles = GetJSFiles();

            if (jsFiles.Count > 0)
            {
                foreach (string item in jsFiles)
                {
                    phBottomScripts.Controls.Add(Create_JS_Link(Get_Base_Url() + item));
                }
            }

            //phBottomScripts.Controls.Add(Create_JS_Link("~/signalr/hubs"));

        }

        private static HtmlLink Create_CSS_Link(string cssFilePath, string media, string id = "")
        {
            var _link = new HtmlLink();
            _link.Attributes.Add("type", "text/css");
            _link.Attributes.Add("rel", "StyleSheet");
            _link.Href = _link.ResolveUrl(cssFilePath);
            if (string.IsNullOrEmpty(media))
                media = "all";
            _link.Attributes.Add("media", media);
            if (!string.IsNullOrEmpty(id))
            {
                _link.Attributes.Add("id", id);
            }
            return _link;
        }

        private static HtmlGenericControl Create_JS_Link(string jsFilePath)
        {
            var _script = new HtmlGenericControl
            {
                TagName = "script"

            };
            _script.Attributes.Add("type", "text/javascript");
            _script.Attributes.Add("src", _script.ResolveUrl(jsFilePath));
            return _script;
        }

        private void Load_Menu()
        {
            //if ((Session["MENU"] != null))
            //{
            //    litMenuList.Text = ((StringBuilder)Session["MENU"]).ToString();
            //}
            //else
            //{
            string strUrl = null;

            strUrl = Get_Base_Url();

            var menus = new business.Menu();

            var _sb = new StringBuilder();

            var lstMenuItems = new List<string>();

            //var boolBlock = false;

            try
            {
                var _lstMenu = menus.GetMenusByRoleId(Convert.ToInt32(Session["ROLE_ID"].ToString()));

                if (_lstMenu.Count > 0)
                {
                    var _lstParent = _lstMenu.GroupBy(i => i.MenuGroupName).Select(group => group.First()).ToList<entities.Menu>();

                    var _lstMenuGroup = (from m in _lstMenu
                                         orderby m.MenuGroupName ascending
                                         select m.MenuGroupName).Distinct();

                    _sb.AppendLine("<ul class='menu'>");
                    _sb.AppendLine("<li>");
                    _sb.AppendLine("<a><i class='menu-icon fa fa-dashboard'></i>Dashboard</a>");
                    _sb.AppendLine("</li>");

                    foreach (string item in _lstMenuGroup)
                    {
                        _sb.AppendLine("<li>");
                        _sb.AppendLine("<a>");
                        _sb.AppendLine("<i class=''></i>" + item.ToString() + "<i class='up-down fa fa-chevron-down'></i>");
                        _sb.AppendLine("</a>");
                        _sb.AppendLine(Load_Sub_Menu(_lstMenu, item.ToString()));
                        _sb.AppendLine("</li>");
                    }

                    _sb.AppendLine("</ul>");
                    //_sb.AppendLine("</div>");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            Session["MENU"] = _sb;

            litMenuList.Text = _sb.ToString();
            //}
        }

        private string Load_Sub_Menu(List<entities.Menu> _list, string pageGroupName)
        {
            var lstMenuItems = new List<string>();

            var _sb = new StringBuilder();

            try
            {
                string strUrl = null;
                strUrl = Get_Base_Url();

                if (!strUrl.EndsWith("/", StringComparison.CurrentCulture))
                    strUrl = strUrl + "/";

                var _lstChild = (from m in _list
                                 where m.MenuGroupName == pageGroupName
                                 select m).ToList<entities.Menu>();

                if (_lstChild.Count > 0)
                {
                    _sb.AppendLine("<ul class='sub-menu'>");

                    foreach (entities.Menu item in _lstChild)
                    {
                        _sb.AppendLine("<li><a href=\"" + strUrl + item.PageLink + ".aspx" + "\" nowrap>" + item.MenuName + "</a></li>");
                    }
                    _sb.AppendLine("</ul>");
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }

            return _sb.ToString();
        }

        //protected void LogOut_Click(object sender, EventArgs e)
        //{
        //    Session.Clear();
        //    Response.Redirect(Get_Base_Url() + "/Login.aspx", true);
        //}

    }
}