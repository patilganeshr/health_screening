<%@ Page Title="Item Category" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ItemCategory.aspx.cs" Inherits="HealthScreeningApp.Masters.ItemCategory" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cpMaster" runat="server">

    <div class="action-toolbar">

        <a href="#" id="AddNewItemCategory"><i class="fa fa-plus fa-fw"></i>New</a>
        <a href="#" id="ShowItemCategoryList"><i class="fa fa-list fa-fw"></i>List</a>
        <a href="#" id="ViewItemCategory"><i class="fa fa-eye fa-fw"></i>View</a>
        <a href="#" id="EditItemCategory"><i class="fa fa-edit fa-fw"></i>Edit</a>
        <a href="#" id="SaveItemCategory"><i class="fa fa-save fa-fw"></i>Save</a>
        <a href="#" id="DeleteItemCategory"><i class="fa fa-remove fa-fw"></i>Delete</a>
        <a href="#" id="PrintItemCategoryList"><i class="fa fa-print fa-fw"></i>Print</a>
        <a href="#" id="FilterItemCategory"><i class="fa fa-filter fa-fw"></i>Filter</a>
        <a href="#" id="ExportItemCategoryList"><i class="fa fa-cog fa-fw"></i>Export</a>

    </div>

    <div class="st-content">

        <div class="container-fluid">

            <div class="page-header">
                <h3>Item Category</h3>
            </div>

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

            <!-- VIEW MODE -->

            <div id="ViewMode">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-info">

                            <div class="panel-heading">
                                <h4 class="panel-title">List of Item Categories</h4>
                            </div>

                            <div class="panel-body">

                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                <div class="table-responsive">
                                    <table id="ItemCategoriesList" class="table table-condesed">
                                        <thead>
                                            <tr>
                                                <th class="text-right">Action</th>
                                                <th>Sr</th>
                                                <th>Item Category Name</th>
                                                <th>Item Category Desc</th>
                                                <th>GST Category Name</th>
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

            <!-- EDIT MODE -->

            <!-- modal open -->

            <div id="EditMode">

                <div class="row">

                    <div class="panel panel-info">

                        <div class="panel-body">

                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Item Category Name</label>
                                            <input type="text" id="ItemCategoryName" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>Item Category Desc</label>
                                            <input type="text" id="ItemCategoryDesc" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="form-group form-group-sm">
                                            <label>GST Category</label>
                                            <select id="GSTCategory" class="form-control"></select>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <!-- EDIT MODE -->

        </div>

    </div>

    <!-- CONTAINER END -->

    <script type="text/javascript" src="../content/scripts/app/shared/default.js"></script>
    <script type="text/javascript" src="../content/scripts/app/Masters/item-category.js"></script>

</asp:Content>
