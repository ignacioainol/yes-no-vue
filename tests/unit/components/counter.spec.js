import Counter from "@/components/Counter"
import { shallowMount } from "@vue/test-utils"

describe('Counter Component', () => { 

  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Counter)
  })
  // test('Debe de hacer match con el snapshot', () => { 

  //   const wrapper = shallowMount(Counter)
  //   expect(wrapper.html()).toMatchSnapshot()
  //  })

  test('Debe de tener el valor por defecto "Counter', () => { 
    const wrapper = shallowMount(Counter)
    expect(wrapper.find('h2').exists()).toBeTruthy()
    const h2 = wrapper.find('h2')
    expect(h2.text()).toBe('Counter')
   })

   test('el valor por default en p debe ser 100', async() => { 
      const wrapper = shallowMount(Counter)
      // const pTags = wrapper.findAll('p')
      const pTag = wrapper.find('[data-testid=counter]')
      expect(pTag.text()).toBe("100")
    })

    test('Debe de incrementar y decrementar el valor del contador', async() => { 
      const [increaseBtn, decreaseBtn] = wrapper.findAll('button')

      await increaseBtn.trigger('click')
      await increaseBtn.trigger('click')
      await increaseBtn.trigger('click')
      await decreaseBtn.trigger('click')
      await decreaseBtn.trigger('click')

      let value = wrapper.find('[data-testid=counter]').text()
      expect(value).toBe('101')
     })

     test('should set the default value', () => { 
       const { start } = wrapper.props()
       const value = wrapper.find('[data-testid=counter]').text()
       expect(Number(value)).toBe(start)
    })

    test('should display the title prop', () => { 

      const title = 'Hola Mundo'
      const wrapper = shallowMount(Counter,{
        props:{
          title
        }
      }) 
      
      expect(wrapper.find('h2').text()).toBe(title)
     })
 })