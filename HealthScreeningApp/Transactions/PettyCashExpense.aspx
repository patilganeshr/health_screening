﻿<%@ Page Title="Petty Cash Expense" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="PettyCashExpense.aspx.cs" Inherits="HealthScreeningApp.Transactions.PettyCashExpense" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cpMaster" runat="server">

    <div class="action-toolbar">

        <a href="#" id="AddNewpettycash"><i class="fa fa-plus fa-fw"></i>New</a>
        <a href="#" id="ShowpettycashList"><i class="fa fa-list fa-fw"></i>List</a>
        <a href="#" id="Viewpettycash"><i class="fa fa-eye fa-fw"></i>View</a>
        <a href="#" id="Editpettycash"><i class="fa fa-edit fa-fw"></i>Edit</a>
        <a href="#" id="Savepettycash"><i class="fa fa-save fa-fw"></i>Save</a>
        <a href="#" id="Deletepettycash"><i class="fa fa-remove fa-fw"></i>Delete</a>
        <%--<a href="#" id="PrintpettycashList"><i class="fa fa-print fa-fw"></i>Print</a>--%>
        <a href="#" id="Filterpettycash"><i class="fa fa-filter fa-fw"></i>Filter</a>
        <a href="#" id="ExportpettycashList"><i class="fa fa-cog fa-fw"></i>Export</a>

    </div>

    <div class="st-content">

        <div class="container-fluid">

            <div class="page-header">
                <h3>Petty Cash Expense</h3>
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

            <div id="ViewMode">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-default">
                            <div class="panel-header">
                                <div class="row panel-body">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <h4 class="panel-title">Petty Cash</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table id="PettyCashList" class="table table-condesed">
                                        <thead>
                                            <tr>
                                                <th class="text-center">Action</th>
                                                <th>Sr</th>
                                                <th>Doc No</th>
                                                <th>Date</th>
                                                <th>Date Range</th>
                                                <th>Account Head</th>
                                                <th>Name of Supplier</th>
                                                <th>Voucher No</th>
                                               <th>Amount</th>
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

                                    <div class="form-horizontal">

                                        <div class="form-group form-group-sm">
                                            <label class="col-sm-2">Doc No.</label>
                                            <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                <input type="text" id="DocNo" class="form-control" />
                                            </div>
                                        </div>

                                        <div class="form-group form-group-sm">
                                            <label class="col-sm-2">Date</label>
                                            <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                <div class="input-group date input-group-md" id="pettycashDateDatePicker">
                                                    <input type="text" id="EntryDate" class="form-control" />
                                                    <span class="input-group-addon">
                                                        <i class="fa fa-calendar"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group form-group-sm">
                                            <label class="col-sm-2">Date Range</label>
                                            <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                <input type="text" id="DateRange" class="form-control" />
                                            </div>
                                        </div>

                                        <div class="form-group form-group-sm">
                                            <label class="col-sm-2">Account Head</label>
                                            <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                                                <select id="AccountHead" class="form-control"></select>
                                            </div>
                                        </div>

                                        <div class="form-group form-group-sm">
                                            <label class="col-sm-2">Name of Supplier</label>
                                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                                <input type="text" id="Supplier" class="form-control" />
                                            </div>
                                        </div>

                                        <div class="form-group form-group-sm">
                                            <label class="col-sm-2">Voucher No.</label>
                                            <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                <input type="text" id="VoucherNo" class="form-control" />
                                            </div>
                                        </div>

                                        <div class="form-group form-group-sm">
                                            <label class="col-sm-2">Amount</label>
                                            <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                <input type="text" id="Amount" class="form-control" />
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
    <script type="text/javascript" src="../content/scripts/app/transactions/pettycash.js"></script>
    <script type="text/javascript" src="../content/scripts/app/shared/masking.js"></script>


</asp:Content>
