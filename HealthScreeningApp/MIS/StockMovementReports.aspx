<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="StockMovementReports.aspx.cs" Inherits="HealthScreeningApp.MIS.StockMovementReports" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cpMaster" runat="server">

    <div class="action-toolbar">

        <a href="#" id="PrintStockMovementList"><i class="fa fa-print fa-fw"></i>Print</a>

    </div>

    <div class="st-content">

        <div class="container-fluid">

            <div class="page-header">
                <h3>Stock Movements Details Report</h3>
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

                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                            <div class="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                                                <div class="form-group form-group-md">
                                                    <label>Search By Drug Name Or Drug Code</label>
                                                    <input type="text" id="SearchDrugName" class="form-control" />

                                                    <div id="SearchDrugList" class="autocompleteList"></div>
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

    </div>

    <script type="text/javascript" src="../content/scripts/app/shared/default.js"></script>
    <script type="text/javascript" src="../content/scripts/app/mis/StockMovementsReport.js"></script>
    <script type="text/javascript" src="../content/scripts/app/mis/drug-dispense.js"></script>

</asp:Content>
