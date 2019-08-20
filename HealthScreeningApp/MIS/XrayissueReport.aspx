<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="XrayissueReport.aspx.cs" Inherits="HealthScreeningApp.MIS.XrayissueReport_aspx" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cpMaster" runat="server">

    <div class="action-toolbar">

        <a href="#" id="IssueReportPrintList"><i class="fa fa-print fa-fw"></i>Print</a>

    </div>

    <div class="st-content">

        <div class="container-fluid">

            <div class="page-header">
                <h3>X-ray Issue Report</h3>
            </div>

            <div id="Loader" class="loader-container" style="display: none;">
                <!--There's the container that centers it-->
                <div class="spinner-frame">
                    <!--The background-->
                    <div class="spinner-cover"></div>
                    <!--The foreground-->
                    <div class="spinner-bar"></div>
                    <!--and the spinny thing-->
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

                                    <div class="form-horizontal">



                                        <div class="form-group form-group-sm">
                                            <label class="col-sm-2">From Date</label>
                                            <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                <div class="input-group date input-group-md" id="IssueDateDatePicker1">
                                                    <input type="text" id="FromDateIssue" class="form-control" />
                                                    <span class="input-group-addon">
                                                        <i class="fa fa-calendar"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        
                                        <div class="form-group form-group-sm">
                                            <label class="col-sm-2">To Date</label>
                                            <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                <div class="input-group date input-group-md" id="IssueDateDatePicker2">
                                                    <input type="text" id="ToDateIssue" class="form-control" />
                                                    <span class="input-group-addon">
                                                        <i class="fa fa-calendar"></i>
                                                    </span>
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
            <!-- Edit Mode -->

        </div>

    </div>
    <script type="text/javascript" src="../content/scripts/app/shared/default.js"></script>
    <script type="text/javascript" src="../content/scripts/app/mis/xrayissuereport.js"></script>
    </asp:Content>