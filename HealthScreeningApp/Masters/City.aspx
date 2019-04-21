<%@ Page Title="City" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="City.aspx.cs" Inherits="HealthScreeningApp.Masters.City" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cpMaster" runat="server">

        <div class="st-content">

        <div class="container-fluid">

    <!-- CONTAINER START -->

        <div id="Loader" class="loader-container">
            <!--There's the container that centers it-->
            <div class="spinner-frame">
                <!--The background-->
                <div class="spinner-cover"></div>
                <!--The foreground-->
                <div class="spinner-bar"></div>
                <!--and the spinny thing-->
            </div>
        </div>

        <div class="page-header text-center">
            <h3>City Master</h3>
        </div>

        <div class="row">

            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                <!-- EDIT MODE -->

                <div id="EditMode">

                    <div class="panel panel-info">

                        <div class="panel-heading">
                            <h4 class="panel-title">City Details </h4>
                        </div>

                        <div class="panel-body">

                            <div class="form-horizontal">

                                <div class="row">
                                                        
                                    <input type="hidden" id="CityId" />

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <div class="form-group form-group-sm">
                                                <label class="control-label col-lg-4 col-md-4 col-sm-4 col-xs-12">State</label>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <select id="State" class="form-control"></select>
                                                </div>
                                            </div>
                                            <div class="form-group form-group-sm">
                                                <label class="control-label col-lg-4 col-md-4 col-sm-4 col-xs-12">City Name</label>
                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <input type="text" id="CityName" class="form-control input-sm" />
                                                </div>
                                            </div>
                                        </div>

                                </div>

                            </div>

                        </div>

                        <div class="panel-footer clearfix">
                            <div class="pull-right">
                                <button type="button" id="BackToCityList" class="btn btn-default btn-sm">Back to List</button>
                                <button type="button" id="SaveCity" class="btn btn-danger btn-sm">Save City</button>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- EDIT MODE -->
            </div>

        </div>


        <div class="row">

            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                <!-- VIEW MODE -->

                <div id="ViewMode">

                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <div class="panel-heading-controls">
                                <a id="AddNewCity" class="panel-add-new-button"><i class="fa fa-plus fa-fw"></i></a>
                                <a id="RefreshCityList" class="panel-heading-controls-space"><i class="fa fa-refresh fa-fw"></i></a>
                                <a id="FilterCityList" class="panel-heading-controls-space" ><i class="fa fa-filter fa-fw"></i></a>
                                <%--<button type="button" id="ExportToExcel" class="btn btn-default btn-xs"><i class="fa fa-file-excel-o"></i> Export </button>--%>
                            </div>
                            <h4 class="panel-title">List of Cities</h4>

                        </div>

                        <div class="panel-body">
                            <div class="table-responsive">
                                <table id="CitiesList" class="table table-condensed">
                                    <thead>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>City Name</th>
                                            <th class="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- VIEW MODE -->

            </div>

        </div>
    
    </div>
</div>

    <!-- .container end -->

    <script type="text/javascript" src="../content/scripts/app/shared/default.js"></script>
    <script type="text/javascript" src="../content/scripts/app/masters/city.js"></script>

</asp:Content>
