<template>
    <div>
    
        <el-row :gutter="14">
            <el-col :span="4">
                <div class="label-wrap category">
                    <label for="">分类：</label>
                    <div class="warp-content">
                        <el-select v-model="categoryValue" placeholder="请选择" style="width: 100%;">
                            <el-option
                               v-for="item in options.category"
                                :key="item.id"
                                :label="item.category_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="label-wrap date">
                    <label for="">日期：&nbsp;&nbsp;</label>
                    <div class="warp-content">
                        <el-date-picker
                            style="width: 100%;"
                            v-model="dateValue"
                            type="datetimerange"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            align="right"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00', '08:00:00']">
                        </el-date-picker>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="label-wrap key-work">
                    <label for="">关键字：&nbsp;&nbsp;</label>
                    <div class="warp-content">
                        <el-select  style="width: 100%;">
                            <el-option 
                            v-for="item in search_option" 
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <el-input  placeholder="请输入内容" style="width: 100%;"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" style="width: 100%;" @click="getList">搜索</el-button>
            </el-col>
            <el-col :span="3" class="empty">&nbsp;&nbsp;.</el-col>
            <el-col :span="2">
                <el-button type="danger" class="pull-right" style="width: 100%;" @click="dialog_info = true">新增</el-button>
            </el-col>
        </el-row>

        <!-- 表格数据 -->
        <div class="black-space-30"></div>
        <div>
            <el-table :data="tableData" border @selection-change="handleSelectionChange" style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="title" label="标题" width="600"></el-table-column>
                <el-table-column prop="category" label="类型" width="130"></el-table-column>
                <el-table-column prop="date" label="日期" width="237"></el-table-column>
                <el-table-column prop="user" label="管理员" width="115"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="deleteItem">删除</el-button>
                        <el-button size="mini" type="success" @click="dialog_info = true">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="black-space-30"></div>
            <!-- 底部分页 -->
            <el-row>
                <el-col :span="12">
                    <el-button size="medium" type="danger" @click="deleteAll">批量删除</el-button>
                </el-col>
                <el-col :span="12">
                    <el-pagination 
                        class="pull-right"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        background 
                        :page-sizes="[10, 20, 30, 40]"
                        layout="total, sizes, prev, pager, next, jumper" 
                        :total="1000">
                    </el-pagination>
                </el-col>
            </el-row>

            <!-- 新增弹窗 -->
            <DialogInfo :flag.sync="dialog_info" :category="options.category" />
        </div>
    </div>
</template>
<script>
import DialogInfo from "./dialog/info";
import { global } from "@/utils/global_V3.0.js";
import { reactive, ref } from "@vue/composition-api";
export default {
    name: "indexInfo",
    components: { DialogInfo },
    setup(props, { root }){
        // 相当于给方法换了一个名称
        const { confirm } = global()
        /**
            数据
         */
        //  弹窗
        const dialog_info = ref(false);
        const tableDatats = ref("id");
        const categoryValue = ref('');
        const dateValue = ref('');
        const search_key = ref("");

        const options = reactive({
            category: []
        });
        // 搜索关键字
        const search_option = reactive([
            {value: "id", label: "ID"},
            {value: "title", label: "标题"}
        ]);
        
        

        // 表格数据
        const tableData = reactive([
            {
                title: '纽约首长',
                category: '国外信息',
                date: '2019-0910 19:31:31',
                user: "管理员"
            },
            {
                title: '纽约首长',
                category: '国外信息',
                date: '2019-0910 19:31:31',
                user: "管理员"
            },
            {
                title: '纽约首长',
                category: '国外信息',
                date: '2019-0910 19:31:31',
                user: "管理员"
            },
            {
                title: '纽约首长',
                category: '国外信息',
                date: '2019-0910 19:31:31',
                user: "管理员"
            }
        ])
        
        
        /**************************************************************
            方法
         */
        
        // 表格
        const handleSelectionChange = (val) =>{
            console.log(val);
        }

        const handleSizeChange = (val) =>{
            console.log(val);
        }

        const handleCurrentChange = (val) =>{
            console.log(val);
        }

        // 删除
        const deleteItem = () => {
            confirm({
                context: "确认删除当前信息，确认后将无法恢复！！",
                tip: "警告",
                type: "warning",
                fn: confirmDelete,
                id: "11111111"
            });
            // global.js版本的   定义全局方法，在mian.js中引入成全局的
            // root.confirm({
            //     context: "确认删除当前信息，确认后将无法恢复！！",
            //     tip: "警告",
            //     type: "warning",
            //     fn: confirmDelete,
            //     id: "11111111"
            // });
        }

        // 删除全部
        const deleteAll = () => {
            confirm({
                context: "确认删除当前所选全部信息，确认后将无法恢复！！",
                type: "warning",
                fn: confirmDelete,
                id: "222222"
            })
            // global.js版本的
            // root.confirm({
            //     context: "确认删除当前所选全部信息，确认后将无法恢复！！",
            //     type: "warning",
            //     fn: confirmDelete,
            //     id: "222222"
            // });
        }

        // 确认删除
        const confirmDelete = (value) => {
            console.log(value)
        }

        // 搜索
        const getList = () => {

        }

        return {
            // ref
            categoryValue,
            dateValue,
            search_key,
            dialog_info,

            // reactive
            options,
            search_option,
            tableData,
            
            // vue2.0 methods
            handleSelectionChange,
            handleSizeChange,
            handleCurrentChange,
            getList,
            deleteItem,
            deleteAll
        }
    }
    
}
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap {
    &.category { @include labelDom(left, 60, 40); }
    &.date { @include labelDom(right, 93, 40); }
    &.key-work { @include labelDom(right,79, 40); }
}
.empty {
    color: #fff;
    
}
</style>