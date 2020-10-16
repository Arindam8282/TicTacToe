// let output = 'not started'
// setTimeout(() => {
//   output = 'completed'
// }, 2000)

// console.log(output)

// let nextMobile = 'finding phone'
// const findMyPhone = (name, cb) => {
//   const names = [
//     'Moto C3',
//     'Redmi Note 7S',
//     'Asus Zenfone Max Pro M2'
//   ]

//   cb(names.find((n) => (name === n)))
// }

// findMyPhone('Moto C3', (data) => {
//   nextMobile = 'hi your phone is ' + data
// })

// console.log(nextMobile)

// new Promise((resolve, reject) => {
//   console.log('promise started')
//   setTimeout(() => {
//     resolve('completed')
//     console.log('promise completed')

//     resolve('finished')
//   }, 5000)
// }).then((data) => {
//   console.log(data)
// }).then((data) => {
//   console.log(data)
// })

const wait = (n) => {
  return new Promise((resolve) => {
   destroy = setTimeout(() => resolve(), 1000 * n)
  })
}

const workLoad = async () => {
  console.log('we are starting the program')
  await wait(5)
  console.log('hurray! we are done')
  setTimeout(()=>{
    console.log('2nd timeout');
  },3000);
  
}

workLoad()

// class Home {
//   constructor(n) {
//     this.n = n
//   }

//   add(n) {
//     console.log(this.n + n)
//   }

//   print(...d) {
//     console.log(...d)
//   }
// }

// const h = new Home(5)
// h.print(1, 2)
// h.add(16)