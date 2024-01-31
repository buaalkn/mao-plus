import { mount } from '@vue/test-utils'
import { describe, expect, it, test } from 'vitest'
import { Search } from '@element-plus/icons-vue'
import Button from '../src/button.vue'

const TEXT = 'buaalkn began his first test'

describe('Button.vue', () => {
  it('create', () => {
    const wrapper = mount(() => <Button type="primary" />)

    expect(wrapper.classes()).toContain('m-button--primary')
  })

  test('render text', () => {
    const wrapper = mount(() => (
      <Button
        v-slots={{
          default: () => TEXT,
        }}
      />
    ))

    expect(wrapper.text()).toEqual(TEXT)
  })

  test('handle click', async () => {
    const wrapper = mount(() => (
      <Button
        v-slots={{
          default: () => TEXT,
        }}
      />
    ))

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })

  // props
  it('icon', () => {
    const wrapper = mount(() => <Button icon={Search} />)

    expect(wrapper.findComponent(Search).exists()).toBeTruthy()
  })

  it('size', () => {
    const wrapper = mount(() => <Button size="large" />)

    expect(wrapper.classes()).toContain('m-button--large')
  })

  it('round', () => {
    const wrapper = mount(() => <Button round />)
    expect(wrapper.classes()).toContain('is-round')
  })

  it('circle', () => {
    const wrapper = mount(() => <Button circle />)

    expect(wrapper.classes()).toContain('is-circle')
  })

  it('disabled', async () => {
    const wrapper = mount(() => <Button disabled />)

    expect(wrapper.classes()).toContain('is-disabled')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
})
