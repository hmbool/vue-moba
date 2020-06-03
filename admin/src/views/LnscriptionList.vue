<template>
	<div>
		<h1>铭文列表</h1>
		<el-table :data="lnscriptions">
			<el-table-column
				prop="_id"
				label="ID"
				width="240"
			></el-table-column>
			<el-table-column prop="name" label="铭文名称"></el-table-column>
			<el-table-column
				prop="description"
				label="铭文效果"
			></el-table-column>
			<el-table-column prop="icon" label="图标">
				<template slot-scope="scope">
					<img :src="scope.row.icon" alt="" style="height:3rem;" />
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="180">
				<template slot-scope="scope">
					<el-button
						type="primary"
						size="small"
						@click="
							$router.push(`/lnscriptions/edit/${scope.row._id}`)
						"
						>编辑</el-button
					>
					<el-button
						type="danger"
						size="small"
						@click="remove(scope.row)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			lnscriptions: [],
		}
	},
	methods: {
		async fetch() {
			const res = await this.$http.get('rest/lnscriptions')
			this.lnscriptions = res.data
		},
		remove(row) {
			this.$confirm(`是否确定要删除分类 "${row.name}"`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				await this.$http.delete(`rest/lnscriptions/${row._id}`)
				this.$message({
					type: 'success',
					message: '删除成功!',
				})
				this.fetch()
			})
		},
	},
	created() {
		this.fetch()
	},
}
</script>
