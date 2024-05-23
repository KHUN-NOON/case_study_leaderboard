const initialState = {
    message: "Hello World! Test"
}

type testAction = 'test/showMessage'

export default function testReducer(state = initialState, action: testAction) {
    return state
}