import RouterBtn from '../components/router-btn'

export default function BlogPage() {
  return (
    <div className='m-10 text-center'>
      <span className='text-lg'>Click a title on te left to view detail</span>
      <div className='my-5 flex justify-center'>
        {/* ソフト及びハードナビゲーションの違いを確認するためにHomeページへ遷移するボタンを用意する */}
        <RouterBtn />
      </div>
    </div>
  )
}
