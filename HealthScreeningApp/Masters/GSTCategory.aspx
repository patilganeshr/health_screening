<%@ Page Title="GST Category" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="GSTCategory.aspx.cs" Inherits="HealthScreeningApp.Masters.GSTCategory" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cpMaster" runat="server">

    <!-- CONTAINER START -->

        <div class="st-content">

        <div class="container-fluid">

        <div id="loader" class="loader-container">
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
            <h3>GST Category</h3>
        </div>

        <div id="EditModeGSTCategory">

            <div class="row">

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                    <div class="panel panel-info">

                        <div class="panel-heading">
                            <h4 class="panel-title">GST Category</h4>
                        </div>

                        <div class="panel-body">

                            <div class="row">

                                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                                    <input type="hidden" id="GSTCategoryId" />

                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>GST Category Name</label>
                                            <input type="text" id="GSTCategoryName" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>HSN Code</label>
                                            <input type="text" id="HSNCode" class="form-control" />
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
            
            <div id="ViewModeGSTRate">
    
                <div class="row">

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                    <div class="panel panel-info">

                        <div class="panel-heading">

                            <div class="row">

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <h4 class="panel-title panel-title-align-middle">GST Rate</h4>

                                    <div class="pull-right">
                                        <button type="button" id="AddNewGSTRate" class="btn btn-info btn-xs">
                                            <i class="fa fa-plus"></i> Add GST Rate
                                        </button>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div class="panel-body">

                            <div class="row">

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="table-responsive">
                                        <table id="GSTRates" class="table table-condensed">
                                            <thead>
                                                <tr>
                                                    <th>Sr No.</th>
                                                    <th>Tax Name</th>
                                                    <th>GST Name</th>
                                                    <th>GST Rate</th>
                                                    <th>Sales Value</th>
                                                    <th>Effective Date</th>
                                                    <th class="text-center">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            </div>

            <div id="EditModeGSTRate">
            
                <div class="row">

                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                    <div class="panel panel-info">

                        <div class="panel-heading">
                            <h4 class="panel-title">GST Rate</h4>
                        </div>

                        <div class="panel-body">

                            <div class="row">

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <input type="hidden" id="GSTRateId" />
                                    <input type="hidden" id="SrNo" />

                                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Tax Name</label>
                                            <select id="TaxName" class="form-control"></select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>GST Name</label>
                                            <input type="text" id="GSTName" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>GST Rate</label>
                                            <input type="text" id="GSTRate" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Sale Value</label>
                                            <input type="text" id="SaleValueAmount" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Effective From Date</label>
                                            <div class="input-group date input-group-sm" id="EffectiveFromDatePicker">
                                                <input type="text" id="EffectiveFromDate" class="form-control" />
                                                <span class="input-group-addon">
                                                    <i class="fa fa-calendar"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div class="panel-footer">
                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="pull-right">
                                        <button type="button" id="BackToGSTRateList" class="btn btn-default btn-xs">Back to List</button>
                                        <button type="button" id="SaveGSTRate" class="btn btn-primary btn-xs">Save GST Rate</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            </div>

            <div class="panel-footer">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="pull-right">
                            <button type="button" id="BackToGSTCategoryList" class="btn btn-default btn-xs">Back to List</button>
                            <button type="button" id="SaveGSTCategory" class="btn btn-primary btn-xs">Save GST Category</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
        <!-- EDIT MODE -->


        <div id="ViewModeGSTCategory">

            <div class="row">

                <div class="panel panel-info">

                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-lg-12 col-md-2 col-sm-12 col-xs-12">
                                <h4 class="panel-title panel-title-align-middle">Cash Sales</h4>

                                <div class="pull-right">
                                    <button type="button" id="CreateNewGSTCategory" class="btn btn-info btn-xs"><i class="fa fa-plus"></i> Create New </button>
                                    <button type="button" id="RefreshGSTCategoryList" class="btn btn-default btn-xs"><i class="fa fa-refresh"></i> Refresh </button>
                                    <button type="button" id="FilterGSTCateogryList" class="btn btn-default btn-xs"><i class="fa fa-filter"></i> Filter </button>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div class="panel-body">

                        <div class="row">

                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                <div class="table-responsive">
                                    <table id="GSTCategories" class="table table-condensed">
                                        <thead>
                                            <tr>
                                                <th>Sr</th>
                                                <th>GST Category Name</th>
                                                <th>HSN Code</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
        <!-- VIEW MODE -->

            </div>

    </div>
    <!-- CONTAINER -->

    <script type="text/javascript" src="../content/scripts/app/shared/default.js"></script>
    <script type="text/javascript" src="../content/scripts/app/Masters/gst-category.js"></script>


</asp:Content>
