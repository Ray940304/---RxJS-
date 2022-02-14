import './style.css';

import { Subject } from 'rxjs';

// 建立 youtuber$ subject (被觀察的目標)
const youtuber$ = new Subject();
// 影片 1 上架，此時還沒有觀察者；只會顯示通知
youtuber$.next(1);
// 輸出結果：
// (沒有任何輸出)

// 建立觀察者 A 物件
const observerA = {
  next: (id) => {
    console.log(`我是觀察者 A，我收到影片 ${id} 上架通知了`);
  },
  error: () => {}, // 沒有要處理「錯誤」的話不一定要加上這一行
  complete: () => {}, // 沒有要處理「完成」的話不一定要加上這一行
};

// 加入觀察者 A，也就是觀察者 A 開啟通知了
const observerASubscription = youtuber$.subscribe(observerA);

// 影片 2 上架，此時觀察者 A 會收到通知
youtuber$.next(2);
// 輸出結果：
// 我是觀察者 A，我收到影片 2 上架通知了

// 加入觀察者 B，也就是觀察者 B 開啟通知了
// 由於只處理 next，這裡就使用簡單的寫法，不另外建立物件
const observerBSubscription = youtuber$.subscribe((id) => {
  console.log(`我是觀察者 B，我收到影片 ${id} 上架通知了`);
});

// 影片 3 上架，此時觀察者 A 跟 B 都會收到通知
youtuber$.next(3);
// 輸出結果：
// 我是觀察者 A，我收到影片 3 上架通知了
// 我是觀察者 B，我收到影片 3 上架通知了

// 移除觀察者 B，也就是觀察者 B 關閉通知了
// 在 ReactiveX 中也稱為「取消訂閱」
observerBSubscription.unsubscribe();

// 影片 4 上架，此時只剩下觀察者 A 會收到通知
youtuber$.next(4);
// 輸出結果：
// 我是觀察者 A，我收到影片 4 上架通知了
