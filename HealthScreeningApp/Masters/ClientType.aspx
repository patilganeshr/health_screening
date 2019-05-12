<%@ Page Title="Client Type" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ClientType.aspx.cs" Inherits="HealthScreeningApp.Masters.ClientType" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<script type="text/javascript">
        var LOGGED_USER = '<%=Session["USER_ID"]%>';
        var SERVICE_PATH = "<%= System.Configuration.ConfigurationManager.AppSettings["ServicePath"].ToString() %>";
        var ROOT_PATH = "<%= System.Configuration.ConfigurationManager.AppSettings["rootpath"].ToString() %>";
        var IP_ADDRESS = "<%= Request.ServerVariables["REMOTE_ADDR"] %>";
    </script>--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cpMaster" runat="server">


    <div class="action-toolbar">

        <a href="#" id="AddNewClientType"><i class="fa fa-plus fa-fw"></i>New</a>
        <a href="#" id="ShowClientTypeList"><i class="fa fa-list fa-fw"></i>List</a>
        <a href="#" id="ViewClientType"><i class="fa fa-eye fa-fw"></i>View</a>
        <a href="#" id="EditClientType"><i class="fa fa-edit fa-fw"></i>Edit</a>
        <a href="#" id="SaveClientType"><i class="fa fa-save fa-fw"></i>Save</a>
        <a href="#" id="DeleteClientType"><i class="fa fa-remove fa-fw"></i>Delete</a>
        <a href="#" id="PrintClientTypeList"><i class="fa fa-print fa-fw"></i>Print</a>
        <a href="#" id="FilterClientTypeList"><i class="fa fa-filter fa-fw"></i>Filter</a>
        <a href="#" id="ExportClientTypeList"><i class="fa fa-cog fa-fw"></i>Export</a>

    </div>

    <div class="st-content">

        <div class="container-fluid">

            <div id="loader">

                <!--There's the container that centers it-->
                <div id="shadow"></div>
                <div id="box"></div>

            </div>

            <div class="page-header">
                <h3>Client Type</h3>
            </div>
            
            <div id="ViewMode">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-default">
                            <div class="panel-header">
                                <div class="row panel-body">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <h4 class="panel-title">Client Type</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">

                                    <table id="ClientTypeList" class="table table-condesed">
                                        <thead>
                                            <tr>
                                                <th class="text-center">Action</th>
                                                <th>Sr</th>
                                                <th>Client Type</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>

                                </div>

                            </div>
                            <div class="panel-footer">
                                <div class="row">
                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">Page 1 of 5</div>
                                    <div class="col-lg-8 col-lg-8 col-sm-8 col-xs-12">
                                        <ul class="pagination pagination-sm pull-right">
                                            <li class="page-item">
                                                <a class="page-link" href="#" tabindex="-1">Previous</a>
                                            </li>
                                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div id="EditMode">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-info">

                            <div class="panel-heading">
                                <h3 class="panel-title"></h3>
                            </div>

                            <div class="panel-body">

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Client Type</label>
                                            <input type="text" id="ClientType" class="form-control input-md" />
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
    <script type="text/javascript" src="../content/scripts/app/shared/default.js"></script>
    <script type="text/javascript" src="../content/scripts/app/Masters/client-type.js"></script>

</asp:Content>
