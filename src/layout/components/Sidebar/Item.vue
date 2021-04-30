<script>
export default {
  name: 'MenuItem',
  functional: true,
  // children:[
  //   {
  //   path: '41545',
  //   name : 'adfdadfdf',
  //   component: () => import('@/views/approvals'),
  //   }
  // ],
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  //它给的第一个h实际上是一个创建标签的函数
  //第二个参数context，有很多属性，其中的props属性被之后的继承
    //context本身就是一个对象，是render要的第二个参数，它是用来接值的
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []
    //console.log(context)  //undefined
    //console.log(context)   几乎就用了一个props

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        //执行这里
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{title}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
