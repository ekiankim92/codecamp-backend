// 1. 문자, 숫자, 불린, 기본 타입 (Primitive)

// (arguments 는 타입을 내가 이렇게 받을래 라고 지정)                    : 여기 이후에 들어오는건 리턴 타입을 정함
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};

const result = getPrimitive("철수", 123, true);

//
//
// 2. any 타입 (그냥 자바스크립트와 같음)
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  console.log(arg1 + 100); // any 는 아무거나 다 됨
  return [arg3, arg2, arg1];
};

const result2 = getAny("철수", 123, true);

//
//
// 3. unknown 타입
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  if (typeof arg1 === "number") console.log(arg1 + 100);
  return [arg3, arg2, arg1];
};

const result3 = getUnknown("철수", 123, true);

//
//
// 4. genetic 타입
function getGenetic<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
  return [arg3, arg2, arg1];
}

const result4 = getGenetic<string, number, boolean>("철수", 123, true);

//
//
// 5. genetic 타입 - 2
function getGenetic2<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
  return [arg3, arg2, arg1];
}

const result5 = getGenetic2<string, number, boolean>("철수", 123, true);

//
//
// 6. genetic 타입 - 3
function getGenetic3<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
  return [arg3, arg2, arg1];
}

const result6 = getGenetic3<string, number, boolean>("철수", 123, true);

//
//
// 7. genetic 타입 - 4
// any 보다 훨씬 안전하고 타입이 뭘로 들어올지 모를떄 generic 을 사용함
// 들어오는 타입과 내가 정해진 타입과 일치해야함
// 사용자가 뭘로 넣어서 사용할지 몰라서 genetric 을 만들어서 사용
const getGenetic4 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
  return [arg3, arg2, arg1];
};

const result7 = getGenetic4<string, number, boolean>("철수", 123, true);
