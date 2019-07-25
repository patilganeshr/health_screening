﻿<%@ Page Title="Drug Dispense Return" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="DrugDispenseReturn.aspx.cs" Inherits="HealthScreeningApp.Transactions.DrugDispenseReturn" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cpMaster" runat="server">

    <div class="action-toolbar">

        <a href="#" id="AddNewDrugReturnDetails"><i class="fa fa-plus fa-fw"></i>New</a>
        <a href="#" id="ShowDrugReturnList"><i class="fa fa-list fa-fw"></i>List</a>
        <a href="#" id="ViewDrugReturnDetails"><i class="fa fa-eye fa-fw"></i>View</a>
        <a href="#" id="EditDrugReturnDetails"><i class="fa fa-edit fa-fw"></i>Edit</a>
        <a href="#" id="SaveDrugReturnDetails"><i class="fa fa-save fa-fw"></i>Save</a>
        <a href="#" id="DeleteDrugReturnDetails"><i class="fa fa-remove fa-fw"></i>Delete</a>
        <a href="#" id="PrintDrugReturnList"><i class="fa fa-print fa-fw"></i>Print</a>
        <a href="#" id="FilterDrugReturnList"><i class="fa fa-filter fa-fw"></i>Filter</a>


    </div>

    <div class="st-content">

        <div class="container-fluid">

            <div class="page-header">
                <h3>Drug Dispense Return</h3>
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
            <!-- .loader-container -->

            <!-- view mode -->
            <div id="ViewMode">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <!-- Filter Options -->

                        <div class="panel panel-default hide" id="SearchDrugReturnDetailsPanel">

                            <div class="panel-heading">

                                <div class="row">

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                        <h4 class="panel-title panel-title-align-middle">Search Drug Return Details</h4>

                                    </div>

                                </div>

                            </div>

                            <div class="panel-body">

                                <div class="row">

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                        <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                            <div class="form-group form-group-md">
                                                <label>Filter Options</label>
                                                <select id="SearchOptions" class="form-control"></select>
                                            </div>
                                        </div>

                                        <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12" style="display:none;">
                                            <div class="form-group form-group-md">
                                                <label>Operator</label>
                                                <select id="SearchOperator" class="form-control"></select>
                                            </div>
                                        </div>

                                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                            <div class="form-group form-group-md">
                                                <label>Search Value</label>
                                                <input type="text" id="SearchValue" class="form-control" />
                                            </div>
                                        </div>

                                        <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12" style="display:none;">
                                            <div class="form-group form-group-md">
                                                <label>Search Condition</label>
                                                <select id="SearchCondition" class="form-control"></select>
                                            </div>
                                        </div>

                                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                            <div class="form-group form-group-md">
                                                <button type="button" id="SearchDrugReturnDetails" class="btn btn-info btn-md" style="margin-top: 26px;">Search</button>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <!-- Filter Options -->

                    </div>

                </div>

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-info">

                            <div class="panel-heading">
                                <h4 class="panel-title">Drug Return Details </h4>
                            </div>

                            <div class="panel-body">
                                <table id="DrugReturnDetailsList" class="table table-condesed">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Action</th>
                                            <th class="text-center">Company Name</th>
                                            <th class="text-center">Emp Code</th>
                                            <th class="text-center">Patient Name</th>
                                            <th class="text-center">Drug Return No.</th>
                                            <th class="text-center">Return Date</th>
                                            <th class="text-center">Year</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
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

                                    <div class="col-lg-1 col-md-1 col-sm-2 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Fin. Year</label>
                                            <select id="FinancialYear" class="form-control"></select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Return No.</label>
                                            <input type="text" id="DrugReturnNo" class="form-control" disabled="disabled" placeholder="Auto Generated" />
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-md">
                                                        <label>Return Date</label>
                                                        <div class="input-group date input-group-md" id="DrugReturnDateDatePicker">
                                                            <input type="text" id="DrugReturnDate" class="form-control" />
                                                            <span class="input-group-addon">
                                                                <i class="fa fa-calendar"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                    <div class="col-lg-1 col-md-1 col-sm-3 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Emp Code</label>
                                            <input type="text" id="PatientCode" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Employee Name</label>
                                            <input type="text" id="PatientName" class="form-control" />
                                            <div id="SearchPatientList" class="autocompleteList"></div>
                                        </div>
                                    </div>

                                    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Company Name</label>
                                            <input type="text" id="EmployerName" class="form-control" />
                                        </div>
                                    </div>

                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Drugs List</label>
                                            <select id="DrugsName" class="form-control"></select>
                                        </div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Past Drug Return Date List</label>
                                            <select id="PastDrugReturnDate" class="form-control"></select>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                    <div class="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                                        <div class="form-group form-group-md">
                                            <label>Search By Drug Name Or Drug Code</label>
                                            <input type="text" id="SearchDrugName" class="form-control" />

                                            <div id="SearchDrugList" class="autocompleteList"></div>
                                        </div>
                                    </div>

                                    <div class="pull-right">
                                        <h3 class="text-deep-orange-A200" style="display:none;">Total Amount Rs. <span id="TotalBillAmount"></span>80.90</h3>
                                    </div>
                                </div>

                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="table-responsive">
                                        <table id="DrugReturnList" class="table table-condensed">
                                            <thead>
                                                <tr>
                                                    <th class="text-center">Action</th>
                                                    <th class="text-center">Drug Code</th>
                                                    <th class="text-center">Drug Name</th>
                                                    <th class="text-center">Dispense Qty</th>
                                                    <th class="text-center">Return Qty</th>
                                                    <th class="text-center">Balance Qty</th>
                                                    <th class="text-center">Rate</th>
                                                    <th class="text-center">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                            <tfoot></tfoot>
                                        </table>
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
    <script type="text/javascript" src="../content/scripts/app/Transactions/drug-dispense-return.js"></script>

</asp:Content>
