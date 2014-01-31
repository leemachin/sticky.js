# sticky.js

Sticky headers, done as simply and as smoothly as possible, with no jumping when the transition occurs.

## Basic Usage

```javascript
$('.header').sticky()
```

## Intermediate Usage

You have a header, but there's something else above it?

```javascript
$('.header').sticky({
  offsetFrom: $('.previous-element')
})
```

## Advanced Usage

You have a header, but there are more than one things above it, and they might not always be visible?

```javascript
$('.header').sticky({
  offsetFrom: $('.previous-element, .other-previous-element')
})
```
