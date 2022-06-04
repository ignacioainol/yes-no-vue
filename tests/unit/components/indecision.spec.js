import Indecision from "@/components/Indecision"
import { shallowMount } from "@vue/test-utils"

describe('Indesicion Component', () => { 

  let wrapper
  let clgSpy

  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      answer: "yes",
      forced: false,
      image: "https://yesno.wtf/assets/yes/2.gif"
    })
  }) )

  beforeEach(() => {
    wrapper = shallowMount(Indecision)
    clgSpy = jest.spyOn(console, 'log')

    jest.clearAllMocks()
  })
  
  test('should first', () => { 
    expect(wrapper.html()).toMatchSnapshot()
   })

   test('writing to input should not trigger anything', async() => { 

      const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')
      const input = wrapper.find('input')
      await input.setValue('Hola Mundo')

      expect(clgSpy).toHaveBeenCalled()
      // expect( getAnswerSpy).toHaveReturnedTimes(0)
      expect( getAnswerSpy).not.toHaveBeenCalled()
    })

    test('write the "?" must trigger the getAnswer',async () => { 
      const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')
      const input = wrapper.find('input')
      await input.setValue('Hola Mundo ?')

      expect( getAnswerSpy).toHaveBeenCalled()
     })

     test('test in getAnswer', async () => { 
       await wrapper.vm.getAnswer()

        const img = wrapper.find('img')

        expect(img.exists()).toBeTruthy()
        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif')
        expect(wrapper.vm.answer).toBe('Si!')
      })

      test('test in getAnswer -  Fail in API', async() => { 

        fetch.mockImplementationOnce( () => Promise.reject('API is down'))

        await wrapper.vm.getAnswer()

        const img = wrapper.find('img')
        
        expect(img.exists()).toBeFalsy()
        expect(wrapper.vm.answer)
       })
 })