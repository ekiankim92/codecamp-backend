interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// 1. Partial 타입 (이것만 해도 물음표가 다 붙음)
type partial = Partial<IProfile>;

// 2. Required 타입 (모든게 다 필수가 됨)
type required = Required<IProfile>;

// 3. Pick 타입 (타입을 고를수 있음. name 과 age 만 고를수 있음)
type pick = Pick<IProfile, "name" | "age">;

// 4. Omit 타입 (타입을 제거할수 있음)
type omit = Omit<IProfile, "school">;

// 5. Record 타입
type union = "Chris" | "Paul" | "Grace"; // Union type
let child1: union = "Chris"; // Chris, Paul, Grace 만 됨
let child2: string = "사과"; // 다른 스트링 다 돰

type fff = Record<union, string | number>; // Record 타입

// 6. 객체의 key 들로 Union 타입 만들기
type ggg = keyof IProfile; // "name" | "age" | "school" | "hobby"
// let myProfile: ggg = "" 이렇게 쓰면 내가 쓰려는게 나옴

// 7. type vs. interface 차이
// interface 는 같은 이름으로 만들면 하나로 합쳐짐. interface 는 선언병합 가능
interface IProfile {
  candy: number; // 선언병합으로 추가됨
}

// 8. 배운것 응용
let profile: Partial<IProfile> = {
  // command + i 로 확인해 보면 candy 가 추가된걸로 볼수 있음
  candy: 10,
};
